const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'p/fvJNB/9gj0bTMiySF7TtAOI9Ws0mQUTa9u40j91bQ=';
  const JOB_ID = '7076160';
  const headers = { 'Authorization': `Bearer ${API_KEY.trim()}` };

  // 1. HANDLE TOGGLE (POST)
  if (req.method === 'POST') {
    try {
      const { enabled } = req.body;
      await axios.patch(`https://api.cron-job.org/jobs/${JOB_ID}`, { enabled }, { headers });
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: "Toggle failed" });
    }
  }

  // 2. HANDLE FETCH (GET)
  try {
    let isEnabled = false;
    let history = [];

    // Try to get Job Status
    try {
      const jobRes = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}`, { headers });
      isEnabled = jobRes.data?.job?.enabled || false;
    } catch (e) { console.log("Job status fetch failed"); }

    // Try to get History
    try {
      const histRes = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, { headers });
      history = histRes.data?.history || [];
    } catch (e) { console.log("History fetch failed"); }

    res.status(200).json({
      enabled: isEnabled,
      history: history
    });

  } catch (error) {
    res.status(500).json({ error: "Full Connection Error" });
  }
};
