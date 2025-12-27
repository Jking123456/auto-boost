const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'asVdr6fswV9XT+aZXFPOWM0e5NpgDCvW2QK8n3F1NB4=';
  const JOB_ID = '7076160';

  // If the request is a POST, we toggle the job status
  if (req.method === 'POST') {
    const { enabled } = req.body;
    try {
      await axios.patch(`https://api.cron-job.org/jobs/${JOB_ID}`, 
        { enabled: enabled },
        { headers: { 'Authorization': `Bearer ${API_KEY}` }}
      );
      return res.status(200).json({ success: true, newState: enabled });
    } catch (e) {
      return res.status(500).json({ error: "Failed to toggle" });
    }
  }

  // Otherwise, just fetch history as usual
  try {
    const response = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    res.status(200).json(response.data.history || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
