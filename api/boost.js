// api/boost.js
import axios from 'axios';

export default async function handler(req, res) {
  // Optional: Only allow POST requests (common for cron services)
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await axios.post('https://axhfreeboosting.axelhosting.xyz/api/boost', {
      url: "YOUR_URL_HERE", // Replace this with your actual link
      service_type: "facebook_boost"
    });

    console.log("Boost Response:", response.data);
    return res.status(200).json({ status: 'success', data: response.data });
  } catch (error) {
    console.error("Boost Error:", error.message);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

