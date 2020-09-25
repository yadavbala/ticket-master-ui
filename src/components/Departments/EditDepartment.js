import React from 'react'
import DepartmentForm from './Form'
import {Container} from 'bootstrap-4-react'
import {connect} from 'react-redux'
import { findDepartment } from '../../selectors/DepartmentSelector'
function EditDepartment(props){
    return(
        <Container>
            <React.Fragment>
                <h1 style={{marginBottom:'40px'}}>Edit Department</h1>
                {props.department ?<DepartmentForm department={props.department}/>:'loading...'}
            </React.Fragment>
        </Container>
    )
}

const mapStateToProps=(state,props)=>{
    const id=props.match.params.id
    return{
        department:findDepartment(state.departments,id)
    }
}

export default connect(mapStateToProps)(EditDepartment)