import React from "react";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
let Ending=()=>{
    let navigate=useNavigate();
    return(
        <footer>
        <div className="cont">
           <h1 onClick={()=>{navigate("/")}}>Qtify</h1>
           <p>Qtify is a digital music service that gives you access to millions of songs and <br/>other content from creators all over the world.</p>
        </div>
        <div className="list">
           <ul>
            <li><h2>Contact</h2></li>
            <li>Hyderabad,India</li>
            <li>qtify@gmail.com</li>
            <li>+91 9876543219</li>
            <li>02145-5421-4525</li>
           </ul>
        </div>
        {/* <button className="bottom" onClick={()=>navigate("#")}>^</button> */}
        <a href="#"  className="bottom" style={{textDecoration:"none"}}> <FontAwesomeIcon icon={faAngleUp} /></a>
        </footer>
    )
}
export default Ending;