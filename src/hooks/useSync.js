

import { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const useSync = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies()
  const token = cookies.get('access')
  const getRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
      );
      if(response.status===200){
      setData(response.data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, getRequest };
};

export default useSync
