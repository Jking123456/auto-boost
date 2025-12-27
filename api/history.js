const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'asVdr6fswV9XT+aZXFPOWM0e5NpgDCvW2QK8n3F1NB4=';
  const JOB_ID = '7076160';

  if (req.method === 'POST') {
    const { enabled } = req.body;
    try {
      await axios.patch(`https://api.cron-job.org/jobs/${JOB_ID}`, 
        { enabled: enabled },
        { headers: { 'Authorization': `Bearer ${API_KEY}` }}
      );
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: "Failed to toggle" });
    }
  }

  try {
    // Get full job details to see if it's currently enabled
    const jobDetail = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    
    const history = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });

    // Send both the status and the logs back to the dashboard
    res.status(200).json({
      enabled: jobDetail.data.job.enabled, // This is the ON/OFF state
      history: history.data.history || []
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
