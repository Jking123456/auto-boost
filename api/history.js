const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'asVdr6fswV9XT+aZXFPOWM0e5NpgDCvW2QK8n3F1NB4='; 
  const JOB_ID = '7076160';
  const headers = { 'Authorization': `Bearer ${API_KEY}` };

  if (req.method === 'POST') {
    try {
      const { enabled } = req.body;
      await axios.patch(`https://api.cron-job.org/jobs/${JOB_ID}`, { enabled }, { headers });
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: "Failed to toggle" });
    }
  }

  try {
    // Try to get both status and history at once
    const [jobRes, histRes] = await Promise.all([
      axios.get(`https://api.cron-job.org/jobs/${JOB_ID}`, { headers }),
      axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, { headers })
    ]);

    res.status(200).json({
      enabled: jobRes.data.job.enabled,
      history: histRes.data.history || []
    });
  } catch (error) {
    // This sends a clearer error if the API key is wrong
    res.status(500).json({ error: "API Key or Job ID invalid", history: [] });
  }
};
