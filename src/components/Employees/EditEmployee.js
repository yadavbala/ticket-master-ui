import React from 'react'
import {Container} from 'bootstrap-4-react'
import {connect} from 'react-redux'
import EmployeeForm  from './Form'
import {findEmployee} from '../../selectors/EmployeeSelector'
function EditEmployee(props){
    
    return(
        <Container>
            <React.Fragment>
                <h1 style={{marginBottom:'40px'}}>Edit Employee</h1>
                {props.employee ?<EmployeeForm employee={props.employee}/>:'loading...'}
            </React.Fragment>
        </Container>
    )
}

const mapStateToProps=(state,props)=>{
    const id=props.match.params.id
    return{
        employee:findEmployee(state.employees,id)
    }
}

export default connect(mapStateToProps)(EditEmployee)