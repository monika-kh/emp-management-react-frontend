import React from 'react';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Userdetail from './components/Userdetail';
import TopNav from './components/TopNav';
import AddAttendence from './components/AddAttendence';
import ErrorPage from './components/ErrorPage';
import Dashboard from './components/Dashboard';


function App() {
  let a = false
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<ErrorPage />} />
            <Route exact path="/" element={<Login />} />
            <Route path="/page" element={<TopNav />} >
              <Route path="user-details" element={<Userdetail />} />
              <Route path="add-attendence" element={<AddAttendence />} />
              <Route path="dashboard" element={<Dashboard />} />
              {/* <Route path="calender" element={<Userdetail />} />
              <Route path="leave-management" element={<Userdetail />} /> */}
              {/* <Route path="/" element={<Userdetail />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
