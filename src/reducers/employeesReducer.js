const initialState=[]
const employeesReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_EMPLOYEE':{
            return [...state,action.payload]
        }
        case 'GET_EMPLOYEES':{
            return [...action.payload]
        }
        case 'REMOVE_EMPLOYEE':{
            return state.filter(emp=>emp._id===action.payload)
               
        }
        case 'EDIT_EMPLOYEE':{
            return state.map(emp=>{
                if(emp._id==action.payload.id){
                    return {...action.payload.data}
                }
                else{
                    return {...emp}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}
export default employeesReducer