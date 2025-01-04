import React from "react";
import NewSongs from "../pages/NewSongs";
import TopSongs from "../pages/TopSongs";
import AllSongs from "../pages/AllSongs";
import Faqs from "../pages/Faqs"
import About from "./About";

let Home=()=>{
    return(
        <>
            
            <About/>
            <TopSongs/>
            <NewSongs/>
            <AllSongs/> 
            <Faqs/>
        </>
    )
}

export default Home;