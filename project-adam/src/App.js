import './App.css';
import Home from './components/Home';

import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Customer from './components/Customer';
import PrivacyPolicy from './components/PrivacyPolicy';

import HomeFAQs from './components/HomeFAQs';
import TermsAndConditions from './components/TermsAndConditions';
function App()  {
  return (
  <div>
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
        <Route path='/customer/*' element={<Customer/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/faq' element={<HomeFAQs/>}/>
        <Route path='/terms-of-use' element={<TermsAndConditions/>}/>
    </Routes>
  </div>
  );
}

export default App;
