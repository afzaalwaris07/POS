import React, {Component} from 'react'; //eslint-disable-line
import { useState } from 'react'; //eslint-disable-line
import {variables} from '../Variables.js'; //eslint-disable-line
import Pagination from "@mui/material/Pagination"; 
import { usePagination } from "../hooks/pagination.js";





const DepartmentPagination = ({ data }) => {

  
  
    // this.state={
    //     departments:[],
    //     modalTitle:"",
    //     depID:0,
    //     depName:"",
  
    //     DepartmentIDFilter:"",
    //     DepartmentNameFilter:"",
    //     departmentsWithoutFilter:[]
    // }
  

  const [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex, //eslint-disable-line
    displayPage,
  ] = usePagination(5, data.length);


  return (
    <div >
      <h1>Departments</h1>
      <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <input className='m-2 form-control' onChange={changeDepartmentIDFilter()} 
                                placeholder='Filter By ID'></input>
                                ID</th>
                            <th>
                                <input className='m-2 form-control' onChange={changeDepartmentNameFilter} 
                                placeholder='Filter By Name'></input>
                            Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const displayPosts = [];
                        for (let i = startPageIndex; i <= endPageIndex; i++) {
                          displayPosts.push(
                            
                            <tr key={data[i].id}>
                                <td>{data[i].id}</td>
                                <td>{data[i].name}</td>
                                <td>
                                    <button type='button' className='btn btn-light mr-1' data-bs-toggle='modal' data-bs-target='#AddModal' onClick={()=>this.editClick(data)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                    <button type='button' className='btn btn-light mr-1' onClick={()=>this.deleteClick(data[i].id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        
                          );
                        }
                        return displayPosts;
                      })()}
                        
                    </tbody>
                </table>
      {/* {(() => {
        const displayPosts = [];
        for (let i = startPageIndex; i <= endPageIndex; i++) {
          displayPosts.push(
            <div key={data[i].id}>
              <h3>
                <span>{i + 1}</span> {data[i].title}{" "}
              </h3>
              <p>{data[i].body}</p>
            </div>
          );
        }
        return displayPosts;
      })()} */}
      <Pagination
        color="primary"
        count={totalPages}
        onChange={(event, value) => displayPage(value)}
      />
    </div>
  );
};

function changeDepartmentIDFilter  (d)  {
  // this.state.DepartmentIDFilter = d.target.value;
  // this.FilterFn();
}

function changeDepartmentNameFilter (d)  {
  // this.state.DepartmentNameFilter = d.target.value;
  // this.FilterFn();
}

export default DepartmentPagination;