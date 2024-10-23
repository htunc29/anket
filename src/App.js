import {Home} from './Home.jsx'
import './App.css';
import { Routes,Route } from 'react-router-dom';
import { Record } from './Records.js';
function App() {
  
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/record' element={<Record/>}/>
   </Routes>
  );
}

export default App;
