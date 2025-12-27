const axios = require('axios');

module.exports = async (req, res) => {
  // Replace with your real API Key from image 8825.jpg
  const API_KEY = 'asVdr6fswV9XT+aZXFPOWM0e5NpgDCvW2QK8n3F1NB4='; 
  const JOB_ID = '7076160';

  // HANDLE TOGGLE (When you click the switch)
  if (req.method === 'POST') {
    const { enabled } = req.body;
    try {
      await axios.patch(`https://api.cron-job.org/jobs/${JOB_ID}`, 
        { enabled: enabled },
        { headers: { 'Authorization': `Bearer ${API_KEY}` }}
      );
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: "Failed to toggle job" });
    }
  }

  // HANDLE REFRESH (When you open the page)
  try {
    // 1. Get Job status (is it ON or OFF?)
    const jobRes = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });

    // 2. Get Execution History
    const historyRes = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });

    // Send everything back to the dashboard
    res.status(200).json({
      enabled: jobRes.data.job.enabled,
      history: historyRes.data.history || []
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from cron-job.org" });
  }
};
