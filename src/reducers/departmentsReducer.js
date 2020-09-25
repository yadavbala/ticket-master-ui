const initialState=[]
 const departmentsReducer=(state=initialState,action)=>{
        switch(action.type){
           case 'ADD_DEPARTMENT':{
                return [...state,action.payload]
            }
            case 'GET_DEPARTMENTS':{
                return [...action.payload]
            }

            case 'REMOVE_DEPARTMENT':{
                return state.filter(dept=>dept._id!=action.payload)
            }

            case 'EDIT_DEPARTMENT':{
                return state.map(dep=>{
                    if(dep._id===action.payload.id){
                        return {...action.payload.dept}
                    }
                    else{
                        return {...dep}
                    }
                })
            }
            
            default:{
                return [...state]
            }
        }
 }
 export default departmentsReducer