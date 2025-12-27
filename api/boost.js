const axios = require('axios');

module.exports = async (req, res) => {
  // Increased timeout to 30 seconds for better stability
  const axiosInstance = axios.create({
    timeout: 30000 
  });

  try {
    console.log("Starting boost request...");
    
    const response = await axiosInstance.post('https://axhfreeboosting.axelhosting.xyz/api/boost', {
      url: "https://www.facebook.com/profile.php?id=61583017822517", // Ensure your actual link is here
      service_type: "facebook_boost"
    });

    console.log("Boost Successful:", response.data);

    return res.status(200).json({
      success: true,
      order_id: response.data.order_id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    // Detailed error logging for Vercel Dashboard
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    console.error("Boost Failed:", errorMsg);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      details: error.response ? error.response.data : "Target server timed out"
    });
  }
};
