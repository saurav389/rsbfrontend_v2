import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('access');

   // const source = axios.CancelToken.source(); // Create a cancel token

    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          // Attach the cancel token
        });

        setData(response.data); // Axios automatically parses the response as JSON
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Fetch aborted');
        } else {
          setError(err); // Set the error state for other errors
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
console.log(data,loading,error)
  
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
