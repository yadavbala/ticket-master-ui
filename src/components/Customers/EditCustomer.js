import React from 'react'
import CustomerForm from './Form'
import {connect} from 'react-redux'
import { findCustomer } from '../../selectors/CustomerSelector'
import {Container} from 'bootstrap-4-react'
function EditCustomer(props){
    return(
        <Container>
            <React.Fragment>
                <h1 style={{marginBottom:'40px'}}>Edit Customer</h1>
                {props.customer ?<CustomerForm customer={props.customer}/>:'loading...'}
            </React.Fragment>
        </Container>
    )
}

const mapStateToProps=(state,props)=>{
    const id=props.match.params.id
    return{
        customer:findCustomer(state.customers,id)
    }
}

export default connect(mapStateToProps)(EditCustomer)