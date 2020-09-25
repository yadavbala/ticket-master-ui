import React from 'react'
import EmployeeForm from './Form'
import {Container} from 'bootstrap-4-react'
function AddEmployee(){
    return(
        <Container>
            <React.Fragment>
                <h1 style={{marginBottom:'40px'}}>Add Employee</h1>
                <EmployeeForm/>
            </React.Fragment>
        </Container>
    )
}

export default AddEmployee