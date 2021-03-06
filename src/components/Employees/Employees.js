import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startGetEmployees} from '../../actions/employeesAction'
import {startRemoveEmployee} from '../../actions/employeesAction'
import {Container,Button} from 'bootstrap-4-react'
import {findDepartmentOnId} from '../../selectors/DepartmentSelector'
import swal from 'sweetalert'
import { BsTrash} from "react-icons/bs";
class Employees extends React.Component{
   /* componentDidMount(){
        if(this.props.employees.length==0){
            this.props.dispatch(startGetEmployees())
        }
    }*/
    handleRemove=(id)=>{
        swal({
            title:'are you sure u want to delete',
            icon:'warning',
            buttons:true,
            dangerMode:true
        })
        .then((willDelete)=>{
            if(willDelete){
            this.props.dispatch(startRemoveEmployee(id))
             swal('successfully deleted',{
                 icon:'success'
             })
             
         }
        })
    }
    render(){
        return(
            <Container>
                <div>
                    <h1 style={{marginBottom:'40px'}}>Employees-{this.props.employees.length}</h1>
                    <div className='table-responsive'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.employees.map((emp,i)=>{
                                    const dept=findDepartmentOnId(this.props.departments,emp.department)
                                    console.log(dept)
                                        return(
                                        <tr key={emp._id}>
                                            <td>{++i}</td>
                                            <td>{emp.name}</td>
                                            <td>{emp.email}</td>
                                            <td>{emp.mobile}</td>
                                            <td>{dept&&dept.name}</td>
                                            <td><Link to={`employees/${emp._id}`}><Button primary>show</Button></Link></td>
                                            <td><Button danger onClick={
                                                ()=>{this.handleRemove(emp._id)}
                                            }><BsTrash/></Button></td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                    </div>
                    <p><Link to='/employees/new'>Add Employee</Link></p>
                </div>
            </Container>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        employees:state.employees,
        departments:state.departments
    }
}
export default connect(mapStateToProps)(Employees)