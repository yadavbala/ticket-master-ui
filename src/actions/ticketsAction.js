import axios from '../config/configureAxios'
import swal from 'sweetalert'
export const setTicket=(data)=>{
    return {type:'SET_TICKET',payload:data}
}

export const startPostTicket=(data,success,redirect)=>{
    return (dispatch)=>{
        axios.post('/tickets',data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.message)
                swal({
                    title: "Alert Message",
                    text: `${response.data.message}`,
                    icon: "error",
                    dangerMode: true
                  })
            }
            else{
                success()
                const ticket=response.data
                dispatch(setTicket(ticket))
                redirect()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const setGetTickets=(data)=>{
    return {type:'GET_TICKETS',payload:data}
}

export const startGetTickets=()=>{
    return (dispatch)=>{
        axios.get('/tickets',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            const tickets=response.data
            dispatch(setGetTickets(tickets))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const setRemoveTicket=(id)=>{
    return {type:'REMOVE_TICKET',payload:id}
}

export const startRemoveTicket=(id)=>{
    return (dispatch)=>{
       
        axios.delete(`/tickets/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            
          
            dispatch(setRemoveTicket(id))
            
        })
        .catch((err)=>{
            console.log(err)
        })
    
    }
}


export const setEditTicket=(id,ticket)=>{
    return {type:'EDIT_TICKET',payload:{
        id,ticket
    }}
}

export const startEditTicket=(data,id,success,redirect)=>{
    return (dispatch)=>{
        axios.put(`/tickets/${id}`,data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
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
                const ticket=response.data
                dispatch(setEditTicket(id,ticket))
                redirect()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const setTicketStatus=(id,data)=>{
    return {type:'STATUS_CHANGE',payload:{
        id,data
    }}
}

export const  ticketStatusChange=(data,id)=>{
    return (dispatch)=>{
        axios.put(`/tickets/${id}`,data,{
            headers:{
               'x-auth':localStorage.getItem('authToken') 
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else{
                const ticket=response.data
                dispatch(setTicketStatus(id,ticket))
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}



