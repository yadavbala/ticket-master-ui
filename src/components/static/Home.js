import React from 'react'
import ticketmaster from '../../images/ticket-master.png'
function Home(){
    return(
        <div style={{justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',marginTop:'40px'}}> 
            <h1 style={{marginBottom:'20px'}}>welcome to ticket master</h1>
            <img src={ticketmaster}/>
        </div>
    )
}

export default Home