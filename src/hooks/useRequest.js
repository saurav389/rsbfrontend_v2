import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
const useRequest = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies()
    const token = cookies.get('access')
    const getRequest = async () => {
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

      const postRequest = async (payload) => {
        setLoading(true);
        setError(null);
        console.log("data to save",payload)
        try {
          const response = await axios.post(url, payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
          );
          console.log("post response",response)
         
          if(response.status===200){
            console.log(response.data)

          setData(response.data);
          toast.success("Saved Successfully")
          }
        } catch (err) {
           
            console.error(err)
            if(err.status===409){
                toast.warning(err.response.data.warning)
              }
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      const patchRequest = async (payload) => {
        console.log("data to update",payload,url)
        setLoading(true);
        setError(null);
        try {
          const response = await axios.patch(url + payload.formdata.id + "/", payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
          );
          if(response.status===200){
          setData(response.data);
          toast.success("Update Successfully")
          }
        } catch (err) {
            if(err.status===409){
                toast.warning(err.response.data.warning)
              }
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      const deleteRequest = async (payload) => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.delete(url + payload.id + "/",
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
      useEffect(() => {
        const source = axios.CancelToken.source();
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
      return ()=>{
        source.cancel()
      }
      }, [url]);


      console.log("useRequest",data)
return { data, error, loading, getRequest,postRequest,patchRequest,deleteRequest }
}
export default useRequest;