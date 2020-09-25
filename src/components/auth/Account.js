import React from 'react'
import {Container,Card} from 'bootstrap-4-react'
import {connect} from 'react-redux'
import user from '../../images/user.jpg'
function Account(props){
    console.log('user',props)
    return(
        <Container>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Card style={{width:'600px',padding:'40px',marginTop:'40px'}}>
                    <span style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                        <h1>User Account Details</h1>
                
                        <img src={user} width='150px' height='150px'/>
                        <p style={{marginTop:'30px'}}>Id-{props.user._id}</p>
                        <p>Name-{props.user.username}</p>
                        <p>Email-{props.user.email}</p>
                    </span>
                </Card>
            </div>
        </Container>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Account)

