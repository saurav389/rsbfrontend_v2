import React, {useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';


function Dashboard() {
    const [reqlist,setReqList] = useState(null)
    const [data,setData] = useState(
      {
          op_pending:0,
          op_rejected:0,
          a_pending:0,
          a_rejected:0,
          ytd:0,
          mtd:0
      }
    )
    const isCurrentYear = (date) => {
      const year = new Date(date).getFullYear();
      const currentYear = new Date().getFullYear();
      return year === currentYear;
  };
  
  const isCurrentMonth = (date) => {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth(); // 0-based index (January is 0)
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      return year === currentYear && month === currentMonth;
  };
  
  // Count requisitions by year and month
  
      useEffect(()=>{
          const cookies = new Cookies()
          const token = cookies.get('access')
          const countRequisitions = (data) => {
              let yearCount = 0;
              let monthCount = 0;
          
              data.forEach(item => {
                  if (isCurrentYear(item.created)) {
                      yearCount++;
                      if (isCurrentMonth(item.created)) {
                          monthCount++;
                      }
                  }
              });
          
              return { yearCount, monthCount };
          };
          const getOp_pending = (data)=>{
              return data?data.filter(element=>element.operation === false).length:0
          }
          const getOp_rejected = (data)=>{
              return data?data.filter(element=>element.orejected === false).length:0
          }
          const getA_rejected = (data)=>{
              return data?data.filter(element=>element.arejected === false).length:0
          }
          const getA_pending = (data)=>{
              return data?data.filter(element=>element.account === false).length:0       }
          
          try{
              const getRequisiton = async ()=>{
                  const res = await axios.get("/requisition/", {
                      headers: {
                          'Authorization': `Bearer ${token}`
                      },
                      withCredentials: true
                  });
                  const response = await res;
                  if(response.status === 200){
                      console.log(response.data)
                      setReqList(response.data.rq)
                      const { yearCount, monthCount } = countRequisitions(response.data.rq);
                      setData({
                          op_pending:getOp_pending(response.data.rq),
                          op_rejected:getOp_rejected(response.data.rq),
                          a_pending:getA_pending(response.data.rq),
                          a_rejected:getA_rejected(response.data.rq),
                          ytd:yearCount,
                          mtd:monthCount
                      })
                    }
              }
              getRequisiton() 
          }
          catch(error){
              console.log(error);
          }
          
        
        },[])
      return (
          <div className='w-full h-screen p-4'>
              <div className='w-full flex justify-center gap-4 flex-wrap'>
                  <div className=' w-72 rounded-md h-40 p-4  bg-[#EAF7CF]'>
                      <h1 className=' text-lg font-bold text-gray-400'>Operations</h1>
                      <div className='grid grid-cols-2 gap-2'>
                      <div className='w-full flex flex-col items-center pr-2 justify-center border-r-2'>
                          <p>Direct</p>
                          <div className='grid grid-cols-2 gap-2'>
                              <p>Pending</p><p>Rejected</p>
                              <p className='text-center'>{data.op_pending}</p><p className='text-center'>0</p>
                          </div>
                      
                      </div>
                   
                      <div className='w-full flex flex-col items-center pr-2 justify-center'>
                          <p> InDirect</p>
                          <div className='grid grid-cols-2 gap-2'>
                              <p>Pending</p><p>Rejected</p>
                              <p className='text-center'>{data.op_pending}</p><p className='text-center'>0</p>
                          </div>
                      
                      </div>
                      </div>
                  </div>
                  <div className=' w-72 rounded-md h-40 p-4 bg-[#EAF7CF]'>
                  <h1 className='text-lg font-bold text-gray-400'>Accounts</h1>
                  <div className='grid grid-cols-2 gap-2 w-full'>
                  <div className='w-full flex flex-col items-center pr-2 justify-center border-r-2'>
                          <p>Direct</p>
                          <div className='grid grid-cols-2 gap-2'>
                              <p>Pending</p><p>Rejected</p>
                              <p className='text-center'>{data.op_pending}</p><p className='text-center'>0</p>
                          </div>
                      
                      </div>
                   
                      <div className='w-full flex flex-col items-center pr-2 justify-center'>
                          <p> InDirect</p>
                          <div className='grid grid-cols-2 gap-2'>
                              <p>Pending</p><p>Rejected</p>
                              <p className='text-center'>{data.op_pending}</p><p className='text-center'>0</p>
                          </div>
                      
                      </div>
                  </div>
                  </div>
                  <div className=' w-72 rounded-md h-40 p-4 bg-[#EAF7CF]'>
                  <div className='grid grid-cols-2 gap-2 w-full'>
                      <h1 className='text-lg font-bold text-gray-400'>YTD</h1>
  
                      <p className='text-center'>{data.ytd}</p>
                      
                      <p>Direct</p><p className='text-center'>2</p>
                      <p>InDirect</p><p className='text-center'>1</p>
                      
                  </div>
  
                  </div>
                  <div className=' w-72 rounded-md h-40 p-4 bg-[#EAF7CF]'>
                  <div className='grid grid-cols-2 gap-2 w-full'>
                      <h1 className='text-lg font-bold text-gray-400'>MTD</h1>
  
                      <p className='text-center'>{data.ytd}</p>
                      
                      <p>Direct</p><p className='text-center'>2</p>
                      <p>InDirect</p><p className='text-center'>1</p>
                      
                  </div>
                  </div>
                  {/* <div className=' w-72 rounded-md h-40 bg-[#A10702]'>
  
  
                  </div> */}
              </div>
           
          </div>
      );
  };

export default Dashboard