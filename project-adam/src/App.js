import './App.css';
import Home from './components/Home';

import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Customer from './components/Customer';
import PrivacyPolicy from './components/PrivacyPolicy';

function App()  {
  return (
  <div>
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
        <Route path='/customer/*' element={<Customer/>}/>
        <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
    </Routes>
  </div>
  );
}

export default App;
