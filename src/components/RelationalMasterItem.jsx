import React, { useState } from 'react'
import useRequest from '../hooks/useRequest'
import RelationalItemTable from './RelationalItemTable';
import CreateRelatinalItemMaster from './CreateRelatinalItemMaster';

function RelationalMasterItem(props) {
    const { data, loading, error,postRequest,patchRequest} = useRequest(props.api)
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
     
    <RelationalItemTable row={data?data[props.list]:[]} loading={loading} dynamicColumn={props.listcolumn} showMaster={master} onRowClick={rowClick} heading={props.heading} />
    
    {
      addMaster && (<CreateRelatinalItemMaster options={data[props.formcolumn]} dynamicColumn={props.listcolumn} data={row} error={error} loading={loading} createNew={postRequest} updateData={patchRequest} showMaster={master} api={props.api} />)}
</div>
  )
}

export default RelationalMasterItem