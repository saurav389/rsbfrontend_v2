import  { useEffect } from 'react'
import Button from '@mui/material/Button';
import { X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { Backdrop, CircularProgress } from '@mui/material';


function CreateRelatinalItemMaster(props) {
    const { register, handleSubmit, reset,watch,control, setValue } = useForm();
    const onSubmit = (data)=>{
        console.log(data)
     
        if(props.data){
            props.updateData({formdata:data})
            
        }
        else{
            // data[props.dynamicColumn] =data[props.dynamicColumn].id
            
            props.createNew({formdata:data})
        }
        
    }
    useEffect(()=>{
        const updateValue = ()=>{
            if(props.data){
                setValue('id',props.data?.id)
                setValue(props.dynamicColumn,props.data?props.data[props.dynamicColumn].id:null)
                setValue('type',props.data?.type)
                setValue('name',props.data?.name)
                setValue('assignedNo',props.data?.assignedNo)
                setValue('shortform',props.data?.shortform)
            }
           
        }
      updateValue()

    },[props.data])
  return (
    <div>
    
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-left">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Master</h3>
                        <button className="text-gray-400 hover:text-gray-500" onClick={()=>props.showMaster()}>
                        <X className="h-6 w-6" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className='flex gap-2'>
                        <label htmlFor="direct">Direct</label>
                        <input {...register("type", { required: true })} type="radio" id="direct" value="direct" defaultChecked />
                        <label htmlFor="indirect">In-Direct</label>
                        <input {...register("type", { required: true })} type="radio" id="indirect" value="indirect" />
                    </div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.dynamicColumn} : {watch('category')} </label>
              
                    <Controller
                        name={props.dynamicColumn}
                        control={control} // Initial value can be set here
                        render={({ field, fieldState: { error } }) => {
                            const { onChange, value, ref } = field;
                            return (
                                <>
                                    <Autocomplete
                                        {...field}
                                        value={
                                                value || null
                                            }
                                        options={props.options}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(event, newValue) => onChange(newValue ? newValue.id : null)} // Set value in form state
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderOption={(props, option) => (
                                            <li {...props} key={option.id}>
                                                {option.name}
                                            </li>
                                            )}
                                        renderInput={(params) => (
                                        <TextField {...params} label="Select Option" variant="outlined"  inputRef={ref} />
                                                 )}
                                    />
                                    {error ? (
                                    <span style={{ color: "red" }}>{error.message}</span>
                                    ) : null}
                            </>
                            )
                        }}
                    />
                                
                            
                        
                        
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>

                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="name" {...register("name", {required: true, maxLength: 80})} />
                    <label htmlFor="assignedno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assigned No</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="assignedno" {...register("assignedNo")} />
                    <label htmlFor="shortform" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Form</label>
                   
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="shortform" {...register("shortform")} />
                    
                    <div className='flex gap-2'>
                    {
                        props.loading? 
                            <Button variant="contained">Saving</Button>
                            :
                            <Button variant="contained" type='submit' >Save</Button>
                    }
                    </div>
            
                    </form>
                </div>
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={props.loading}
                    >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
    </div>
  )
}

export default CreateRelatinalItemMaster