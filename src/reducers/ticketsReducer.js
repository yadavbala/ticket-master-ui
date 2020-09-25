const initialState=[]
const ticketsReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_TICKET':{
            return [...state,action.payload]
        }
        case 'GET_TICKETS':{
            return [...action.payload]
        }
         case 'REMOVE_TICKET':{
                return state.filter(ticket=>ticket._id!=action.payload)
         }
         case 'STATUS_CHANGE':{
             return state.map(tick=>{
                 if(tick._id===action.payload.id){
                     return {...action.payload.data}
                 }
                 else{
                     return {...tick}
                 }
             })
         }
         case 'EDIT_TICKET':{
             return state.map(tick=>{
                 if(tick._id===action.payload.id){
                     return {...action.payload.ticket}
                 }
                 else{
                     return {...tick}
                 }
             })
         }
        default:{
            return [...state]
        }
    }
}

export default ticketsReducer