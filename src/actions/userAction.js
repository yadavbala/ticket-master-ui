import axios from '../config/configureAxios'
import swal from 'sweetalert'
import { startGetCustomers } from './customersAction'
import { startGetDepartments } from './departmentsAction'
import { startGetEmployees } from './employeesAction'
import { startGetTickets } from './ticketsAction'
export const setUser=(user)=>{
  return {type:'SET_USER',payload:user}
}

export const startLoginUser=(formData,redirect,success)=>{
  return (dispatch)=>{
      axios.post('/users/login',formData)
      .then((response)=>{
        if(response.data.hasOwnProperty('error')){
         swal({
          title: "Alert Message",
          text: `${response.data.error}`,
          icon: "error",
          dangerMode: true
        })
        }
        else{
          //success()
          localStorage.setItem('authToken',response.data.token)
          axios.get('/users/account',{
            headers:{
              'x-auth':localStorage.getItem('authToken')
            }
          })
          .then((response)=>{
            console.log(response.data)
            const user=response.data
            dispatch(setUser(user))
            swal('login','successfully logged in','success')
            redirect()
          })
          .catch((err)=>{
            console.log(err)
          })

         const p1=axios.get('/customers',{
            headers:{
              'x-auth':localStorage.getItem('authToken')
            }
          })

          const p2=axios.get('/departments',{
            headers:{
              'x-auth':localStorage.getItem('authToken')
            }
          })

          const p3=axios.get('/employees',{
            headers:{
              'x-auth':localStorage.getItem('authToken')
            }
          })

        const p4=axios.get('/tickets',{
          headers:{
            'x-auth':localStorage.getItem('authToken')
          }
        })

          Promise.all([p1,p2,p3,p4]).then((values)=>{
                console.log(values)
              return Promise.all (values.map(val=>val.data))
          }).then(([customers,departments,employees,tickets])=>{
              console.log(customers,departments,employees,tickets)
              dispatch(startGetCustomers(customers))
              dispatch(startGetDepartments(departments))
              dispatch(startGetEmployees(employees))
              dispatch(startGetTickets(tickets))
             
             
              //setTimeout(()=>document.location.reload(),1000)
          })
          .catch((err)=>{
            console.log(err)
          })
          
        }
      })
     
  }
}

export const startGetUser=()=>{
  return (dispatch)=>{
    axios.get('users/account',{
      headers:{
        'x-auth':localStorage.getItem('authToken')
      }
    })
    .then((response)=>{
      const user=response.data
      dispatch(setUser(user))
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}

export const startPostRegisterData=(data,redirect,success)=>{
    return (dispatch)=>{
        axios.post('/users/register',data)
        .then((response)=>{
          console.log(response)
          if(response.data.hasOwnProperty('errors')){
           swal({
            title: "Alert Message",
            text: `${response.data.message}`,
            icon: "error",
            dangerMode: true
          })
          }
          else{
            //success()
            swal('Registered','successfully registered','success')
            redirect()
          }
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
}

export const startUserLogout=()=>{
    return (dispatch)=>{
      axios.delete('/users/logout',{
        headers:{
          'x-auth':localStorage.getItem('authToken')
        }
      })
      
      .then((response)=>{
            console.log(response)
            swal('logout',`${response.data.notice}`,'success')
            if(response.data.notice){
              localStorage.removeItem('authToken')
              dispatch(setUser({}))
              window.location.href='/'
            }
              
      })
      .catch((err)=>{
        console.log(err)
      })
    }
}