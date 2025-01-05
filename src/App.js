import React,{Suspense} from 'react';
import "./style.css";
// import Home from './components/Home';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import RoutedPart from './pages/RoutedPart';
import Menu from './components/Menu';
import Ending from './components/Ending';
let Home=React.lazy(()=>import("./components/Home"));
function App() {
  return (
    <Suspense fallback={<img src="https://th.bing.com/th?id=OIP.2fIVFbHjjYPpT9vOiPYjtgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt="loading" style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",}}/>}>
      <BrowserRouter>
        <Menu/>      
          <Routes>          
              <Route path='/' element={<Home/>}/>
              <Route path='/innerImage/:name' element={<RoutedPart/>}/>          
          </Routes>           
        <Ending/>
      </BrowserRouter>
    </Suspense>
      
  );
}

export default App;
