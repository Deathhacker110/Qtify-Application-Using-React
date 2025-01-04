import React from "react";

let About = () => {
    return(
        <>
           <center style={{display:"flex",justifyContent:"space-evenly",marginTop:"50px"}}>
          <div style={{
            position:"relative"
            }}>
          <h2 style={{color:"white",fontSize:"35px",fontFamily: "Open Sans, sans-serif",marginBottom:"5px"}}>100 Thousand Songs, ad free</h2>
          <h2 style={{color:"white",fontSize:"35px",fontFamily: "Open Sans, sans-serif",}}>Over thousands podcast episodes</h2>
          </div>
           <div><img src="https://qtify-venkykumar.netlify.app/static/media/headphone.66e109c97f55e2a35a02d810fa2b6650.svg" alt="" 
           style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"centre",
            position:"absolute",
            right:"20%"            
            }}/></div>
           </center>
        </>
    )
}

export default About;