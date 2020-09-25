import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {startPostEmployee, startEditEmployee} from '../../actions/employeesAction'
import {Container,Row,Col,Button,Card,Alert} from 'bootstrap-4-react'

class EmployeeForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.employee ? props.employee.name:'',
            email:props.employee ? props.employee.email:'',
            mobile:props.employee ? props.employee.mobile:'',
            department:props.employee ? props.employee.department:'',
            success:''
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
      
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            department:this.state.department
        }
        console.log(formData)
        const success=()=>{
            this.setState({success:this.props.employee ?'employee details have been edited successfully':'employee details have been added successfully'})
        }
        const redirect=()=>{
            setTimeout(() => {
               this.props.history.push('/employees') 
            },3000);
        }
        if(this.props.employee){
            this.props.dispatch(startEditEmployee(formData,this.props.employee._id,success,redirect))
        }
        else{
            this.props.dispatch(startPostEmployee(formData,success,redirect))
        }
       
        this.setState({
            name:'',
            email:'',
            mobile:'',
            department:'',
            success:''
        })
    }

    render(){
        return(
       
            <div>
                
                <Card className='align-card'>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <Row>
                            <Col col='col-lg-2 sm-3 12'><label htmlFor='name'>Name</label></Col>
                            <Col col='col-lg-10 sm-9 12'>
                            <input 
                                type='text'
                                value={this.state.name}
                                onChange={this.handleChange}
                                name='name'
                                id='name'
                                placeholder='enter your name'
                                style={{width:'100%'}}
                                className='form-control'
                            />
                            </Col>
                        </Row>
                    </div>
                    <div className='form-group'>
                        <Row>
                            <Col col='col-lg-2 sm-3 12'><label htmlFor="email">Email</label></Col>
                            <Col col='col-lg-10 sm-9 12'>
                                <input 
                                    type='text'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    name='email'
                                    id='email'
                                    placeholder='enter your email'
                                    style={{width:'100%'}}
                                    className='form-control'
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className='form-group'>
                        <Row>
                            <Col col='col-lg-2 sm-3 12'><label htmlFor='mobile'>Mobile</label></Col>
                            <Col col='col-lg-10 sm-9 12'>
                                <input 
                                type='number'
                                value={this.state.mobile}
                                onChange={this.handleChange}
                                name='mobile'
                                id='mobile'
                                placeholder='enter your mobile number'
                                style={{width:'100%'}}
                                className='form-control'
                                />
                            </Col>
                        </Row>
                    </div>
                       
                    <div className='form-group'>
                        <Row>
                            <Col col='col-lg-2 sm-3 12'><label htmlFor='department'>department</label></Col>
                            <Col col='col-lg-10 sm-9 12'>
                            <select onChange={this.handleChange} value={this.state.department} id='department' name='department' style={{width:'100%'}}
                            className='form-control'>
                                <option value=''>select</option>
                                {
                                    this.props.departments.map(dept=>{
                                        return <option key={dept._id} value={dept._id}>{dept.name}</option>
                                    })
                                }
                            </select>
                            </Col>
                        </Row>
                    </div>
                           
                        
                        <div className='button-align' style={{marginTop:'20px'}}>
                                <Button success type='submit'>submit</Button>
                        </div>
                </form>
              
                </Card>
                {this.state.success &&<Alert success style={{marginTop:'15px'}}>{this.state.success}</Alert>}
            </div>
       
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        departments:state.departments,
      
    }
}

export default withRouter(connect(mapStateToProps)(EmployeeForm))