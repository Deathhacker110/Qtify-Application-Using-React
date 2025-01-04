import React, { useEffect, useState } from 'react';
let Custom = (url) => {
    let [state,setState]=useState([]);
    useEffect(()=>{
       try{
        fetch(url)
        .then(res=>res.json())
        .then(data=>setState(data))
        console.log(state);
       }
        catch(err){
            console.log(err);
       }

    },[]);
    return state;
}
export default Custom;