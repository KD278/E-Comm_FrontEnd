import React, { useEffect } from 'react';
import axios from 'axios';

const VerificationComponent = () => {
  useEffect(() => {
    // Assuming you get the userId from the URL parameters or state
    const userId = 'your_user_id'; // Replace with the actual userId

    // Make the API call to the /api/verify endpoint
    axios.get(`/api/verify?userId=${userId}`)
      .then(response => {
        // Handle success
        console.log(response.data.message);
      })
      .catch(error => {
        // Handle error
        console.error(error.response.data.message);
      });
  }, []); // Empty dependency array means this effect runs once after the component mounts

  return (
    <div>
      <h1>Email verified successfully !!!</h1>
      {/* Add your content here */}
    </div>
  );
};

export default VerificationComponent;
