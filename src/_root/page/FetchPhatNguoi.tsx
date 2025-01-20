import { useEffect } from 'react';

const FetchPhatNguoi = () => {
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('https://ducvan-backend.onrender.com/phatnguoi?bienso=63B02028');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json() // Assuming the server returns JSON
            console.log('Response Data:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);

  return <div>Check the console for response data!</div>;
}

export default FetchPhatNguoi