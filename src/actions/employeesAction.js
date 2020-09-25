import axios from '../config/configureAxios'
import { setEditCustomer } from './customersAction'
import swal from 'sweetalert'
export const setPostEmployee=(emp)=>{
    return {type:'SET_EMPLOYEE',payload:emp}
}

export const startPostEmployee=(data,success,redirect)=>{
    return (dispatch)=>{
        axios.post('/employees',data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                //alert(response.data.message)
                swal({
                    title: "Alert Message",
                    text: `${response.data.message}`,
                    icon: "error",
                    dangerMode: true
                  })
            }
            else{
                success()
                const emp=response.data
                dispatch(setPostEmployee(emp))
                redirect()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const setGetEmployees=(emp)=>{
    return {type:'GET_EMPLOYEES',payload:emp}
}

export const startGetEmployees=()=>{
    return (dispatch)=>{
    axios.get('/employees',{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then((response)=>{
        console.log(response)
        const employees=response.data
        dispatch(setGetEmployees(employees))
    })
    .catch((err)=>{
        console.log(err)
    })
}
}

export const setRemoveEmployee=(id)=>{
    return {type:'REMOVE_EMPLOYEE',payload:id}
}

export const startRemoveEmployee=(id)=>{
    return (dispatch)=>{
       
        axios.delete(`employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            //const id=response._id
           
            dispatch(setRemoveEmployee(id))
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
}

export const setEditEmployee=(id,data)=>{
    return {type:'EDIT_EMPLOYEE',payload:{
        id,data
    }}
}

export const startEditEmployee=(data,id,success,redirect)=>{
    return (dispatch)=>{
        axios.put(`/employees/${id}`,data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
               // alert(response.data.message)
               swal({
                title: "Alert Message",
                text: `${response.data.message}`,
                icon: "error",
                dangerMode: true
              })
            }
            else{
                success()
                const data=response.data
                dispatch(setEditEmployee(id,data))
                redirect()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}