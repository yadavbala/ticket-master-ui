    const initialState=[]
const customersReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_CUSTOMER':{
            return [...state,action.payload]
        }

        case 'GET_CUSTOMERS':{
            return [...action.payload]
        }

        case 'REMOVE_CUSTOMER':{
            return state.filter(cust=>cust._id!=action.payload)
        }

        case 'EDIT_CUSTOMER':{
            return state.map(cust=>{
                if(cust._id===action.payload.id){
                    return {...action.payload.data}
                }
                else{
                    return {...cust}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}

export default customersReducer