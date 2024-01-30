import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
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
    }
  }, [userId]); // Add userId to the dependency array to re-run the effect when userId changes

  return (
    <div>
      <h1>Verification Page</h1>
      {/* Add your content here */}
    </div>
  );
};

export default Verify;
