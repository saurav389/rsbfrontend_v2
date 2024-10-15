import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Plus } from 'lucide-react';

function RelationalItemTable(props) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        {field:`${props.dynamicColumn}`, headerName:props.dynamicColumn.charAt(0).toUpperCase() + props.dynamicColumn.slice(1),
            renderCell:(params)=>params.row[props.dynamicColumn]?.name
        },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'assignedNo', headerName: 'ASIGNED NO', width: 200 },
        {
          field: 'shortform',
          headerName: 'SHORTFORM',
          width: 200,
        },
       
      ];

    

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">{props.heading.toUpperCase()}</h2>
              <Button onClick={()=>props.showMaster()} sx={{
                                                            background: "#171717",
                                                            color: "white"
                                                        }}>
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
  

            <div style={{ height: 500, width: '100%', }}>
            {props.loading?
            <h3>Loading......</h3>
            :
            <DataGrid
                    rows={props.row}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    onRowClick={props.onRowClick}
                />
            }
                
            </div>
        </div>
    </div>
  )
}

export default RelationalItemTable