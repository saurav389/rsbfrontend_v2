import React, { useState } from 'react'
import useRequest from '../hooks/useRequest'
import MasterTable from './MasterTable'
import CreateMaster from './CreateMaster';

function Master(props) {
 
    const { data, loading,postRequest,patchRequest} = useRequest(props.api)
    const [row,setRow] = useState(null)
    const [addMaster,setAddMaster] = useState(false)
    const master = ()=> {
      setAddMaster(!addMaster)
      setRow(null)
    }
   
    const rowClick = (params)=> {
      setRow(params.row);
      setAddMaster(true)
    }
  return (
    <div>
     
        <MasterTable row={data?.item} loading={loading} showMaster={master} onRowClick={rowClick} heading={props.heading} />
        
        {
          addMaster && (<CreateMaster data={row} loading={loading} createNew={postRequest} updateData={patchRequest} showMaster={master} api={props.api} />)}
    </div>
  )
}

export default Master