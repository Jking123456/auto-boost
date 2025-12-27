const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'p/fvJNB/9gj0bTMiySF7TtAOI9Ws0mQUTa9u40j91bQ=';
  const JOB_ID = '7076160';
  const headers = { 'Authorization': `Bearer ${API_KEY.trim()}` };

  try {
    // Only fetch history to keep the request lightweight
    const histRes = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, { headers });

    res.status(200).json({
      history: histRes.data?.history || []
    });
  } catch (error) {
    // Passes the status code (like 429) back to your dashboard
    res.status(error.response ? error.response.status : 500).json({ 
      error: "Connection Error",
      status: error.response ? error.response.status : "No Response"
    });
  }
};
