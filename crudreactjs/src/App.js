import './App.scss';
import { useState, useEffect } from "react";
import {Home} from './Pages/Home';
import {Home1} from './Pages/Home1';
import {Department} from './Pages/Department';
import DepartmentPagination from './Pages/DepartmentPagination';
import {Employee} from './Pages/Employee';
import {PdfViewer} from './Pages/PdfViewer';
import { variables } from './Variables';

//import SideMenuBar from './SideMenuBar/SideMenuBar';
import AppLayout from './Components/Layout/AppLayout';
import 'boxicons/css/boxicons.min.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
// import {BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
 

function App() {
  const [data, setData] = useState([]);
  //getting posts
  useEffect(() => {
    const paginationFunc = async () => {
      const res = await fetch(variables.API_Url+'Department');
      const data = await res.json();
      setData(data);
      console.log(data);
    };
    paginationFunc();
  }, []);

    return (
      //<>{data && data.length > 0 ? <Pages data={data} /> : <p>Loading...</p>}</>

    <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout/> }>
            <Route path='/Home' element={<Home/>} /> 
            <Route path='/Home1' element={<Home1/>} /> 
            <Route path='/Employee' element={<Employee/>} /> 
            <Route path='/Department' element={<Department/>} /> 
            <Route path='/PdfViewer' element={<PdfViewer/>} /> 
            <Route path='/DepartmentPagination' element={<DepartmentPagination data={data} />} /> 
            {/* <Route path='/DepartmentPagination' element={<DepartmentPagination />} /> */}

          </Route>
        </Routes>
        
        </BrowserRouter>
    );
  }

export default App;
