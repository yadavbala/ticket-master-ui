import React from 'react'
import {startAddDepartment, startEditDepartment} from '../../actions/departmentsAction'
import {connect} from 'react-redux'
import {Container,Row,Col,Button,Card,Alert} from 'bootstrap-4-react'
import {withRouter} from 'react-router-dom'
class DepartmentForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            department:props.department ? props.department.name:'',
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
            name:this.state.department
        }
        console.log(formData)
        const success=()=>{
             this.setState({success:this.props.department?'department edited successfully':'department added successfully'})
         }
         const redirect=()=>{
             setTimeout(()=>{
                 this.props.history.push('/departments')
             },3000)
         }
         if(this.props.department){
            this.props.dispatch(startEditDepartment(formData,this.props.department._id,success,redirect))
         }
         else{
            this.props.dispatch(startAddDepartment(formData,success,redirect))
         }
       
        this.setState({department:''})
}

    render(){
        return(
           
                <div>
                   
                    <Card className='align-card'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <Row>
                                    <Col col='col-lg-2 sm-3 12'><label htmlFor='department'>Department</label></Col>
                                    <Col col='col-lg-10 sm-9 12'>
                                    <input
                                    type='text'
                                    value={this.state.department}
                                    onChange={this.handleChange}
                                    name='department'
                                    id='department'
                                    placeholder='enter your department'
                                    className='form-control'
                                    style={{width:'100%'}}
                                    /></Col>
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

export default withRouter(connect()(DepartmentForm))