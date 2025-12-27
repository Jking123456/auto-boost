const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'p/fvJNB/9gj0bTMiySF7TtAOI9Ws0mQUTa9u40j91bQ=';
  const JOB_ID = '7076160';
  
  const headers = { 'Authorization': `Bearer ${API_KEY}` };

  if (req.method === 'POST') {
    try {
      const { enabled } = req.body;
      await axios.patch(`https://api.cron-job.org/jobs/${JOB_ID}`, { enabled }, { headers });
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: "Toggle Failed" });
    }
  }

  try {
    const jobDetail = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}`, { headers });
    const jobHistory = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, { headers });

    res.status(200).json({
      enabled: jobDetail.data.job.enabled,
      history: jobHistory.data.history || []
    });
  } catch (error) {
    res.status(401).json({ 
      error: "API Key or Job ID invalid", 
      details: error.response ? error.response.data : "No response from cron-job.org",
      history: [] 
    });
  }
};
