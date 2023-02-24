
import Message from "./pages/Message";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App(){
return(
<BrowserRouter>
      <Routes>
           <Route path="/" element={<Login />}  />
          <Route path='/signup' element={<Signup />} />
          <Route path='/chat' element={<Message /> } />
       
      </Routes>
    </BrowserRouter>
);
}