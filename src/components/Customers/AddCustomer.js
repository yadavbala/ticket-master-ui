import React from 'react'
import CustomerForm from './Form'
import {Container} from 'bootstrap-4-react'
function AddCustomer(){
    return(
        <Container>
            <React.Fragment>
                <h1 style={{marginBottom:'40px'}}>Add Customer</h1>
                <CustomerForm/>
            </React.Fragment>
        </Container>
    )
}

export default AddCustomer