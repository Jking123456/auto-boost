const axios = require('axios');

module.exports = async (req, res) => {
  // Set a timeout of 10 seconds for the external API call
  const axiosInstance = axios.create({
    timeout: 10000 
  });

  try {
    // Make the POST request to the boosting service
    const response = await axiosInstance.post('https://axhfreeboosting.axelhosting.xyz/api/boost', {
      url: "https://www.facebook.com/profile.php?id=61583017822517", // Replace this with your target URL
      service_type: "facebook_boost"
    });

    // Send the success response back to cron-job.org
    return res.status(200).json({
      status: "Triggered",
      api_response: response.data
    });

  } catch (error) {
    // If the external API is down or times out, send the error log
    console.error("Boost Error:", error.message);
    
    return res.status(500).json({
      status: "Error",
      message: error.message,
      detail: error.response ? error.response.data : "No response from service"
    });
  }
};
