import React from 'react'
import DepartmentForm from './Form'
import {Container} from 'bootstrap-4-react'
function AddDepartment(){
    return(
        <Container>
            <React.Fragment>
                    <h1 style={{marginBottom:'40px'}}>Add Department</h1>
                    <DepartmentForm/>
            </React.Fragment>
        </Container>
    )
}

export default AddDepartment