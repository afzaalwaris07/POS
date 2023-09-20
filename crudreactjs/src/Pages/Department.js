import React, {Component} from 'react';
//import { useState } from 'react';
import {variables} from '../Variables.js';

export class Department extends Component{

    constructor(props){
        super(props);

        this.state={
            departments:[],
            modalTitle:"",
            depID:0,
            depName:"",

            DepartmentIDFilter:"",
            DepartmentNameFilter:"",
            departmentsWithoutFilter:[]
        }
    }
    FilterFn(){
        var DepartmentIDFilter = this.state.DepartmentIDFilter;
        var DepartmentNameFilter = this.state.DepartmentNameFilter;

        var filteredData = this.state.departmentsWithoutFilter.filter(
            function(el){
                return el.id.toString().toLowerCase().includes(
                    DepartmentIDFilter.toString().trim().toLowerCase()
                )&&
                el.name.toString().toLowerCase().includes(
                    DepartmentNameFilter.toString().toLowerCase()
                )
            }
        );
        this.setState({departments:filteredData})
    }
    changeDepartmentIDFilter =(d)=>{
        this.state.DepartmentIDFilter = d.target.value;
        this.FilterFn();
    }
    changeDepartmentNameFilter =(d)=>{
        this.state.DepartmentNameFilter = d.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_Url+'Department').then(Response=>Response.json())
        .then(data=>{this.setState({departments:data, departmentsWithoutFilter:data})});
    }
    componentDidMount(){
        this.refreshList();
    }

    changeDepName=(d)=>{
        this.setState({depName:d.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Department",
            depID:0,
            depName:""
        });
    }
    editClick(dep){
        this.setState({
            modalTitle:"Edit Department",
            depID:dep.id,
            depName:dep.name
        });
    }

    createClick(){
        fetch(variables.API_Url+'Department', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }, 
            body:JSON.stringify({
                Name:this.state.depName
            })
        })
        .then(Response=>Response.json()).then(
            (result)=>{alert(result);this.refreshList();},
        (error)=>{alert("Failed");
        })
    }
    updateClick(){
        fetch(variables.API_Url+'Department', {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'content-Type':'application/json'
            }, 
            body:JSON.stringify({
                ID:this.state.depID,
                Name:this.state.depName
            })
        })
        .then(Response=>Response.json())
        .then((result)=>{alert(result);this.refreshList();},(error)=>{alert("Failed");
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure to delete this record?')){
        fetch(variables.API_Url+'Department/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'Application/json',
                'Content-Type':'Application/json'
            }
        })
        .then(Response =>Response.json())
        .then((result)=>{alert(result);this.refreshList();},(error)=>{alert('Failed');
    })
    }   
    }

    render (){
        const {
            departments,
            modalTitle,
            depID,
            depName
        }=this.state;

    ///Pagination
    //const [currentPage, setCurrentPage] = useState(1);
    //const [recordPerPage, setRecordPerPage] = useState(5);
    
    // const lastIndex = currentPage * recordPerPage;
    // const firstIndex = lastIndex - recordPerPage;
    // const records = departments.slice(firstIndex, lastIndex);
    // const nPage = Math.ceil(departments.length / recordPerPage);
    // const numbers = [...Array(nPage + 1).keys()].slice(1)

        return (
<div>
            <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target='#AddModal' 
            onClick={()=>this.addClick()}>Add Department</button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <input className='m-2 form-control' onChange={this.changeDepartmentIDFilter} 
                                placeholder='Filter By ID'></input>
                                ID</th>
                            <th>
                                <input className='m-2 form-control' onChange={this.changeDepartmentNameFilter} 
                                placeholder='Filter By Name'></input>
                            Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dep=>
                            <tr key={dep.id}>
                                <td>{dep.id}</td>
                                <td>{dep.name}</td>
                                <td>
                                    <button type='button' className='btn btn-light mr-1' data-bs-toggle='modal' data-bs-target='#AddModal' onClick={()=>this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                    <button type='button' className='btn btn-light mr-1' onClick={()=>this.deleteClick(dep.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                    {/* <nav className='float-end m-r-20'>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <a href='#' className='page-link' onClick={prePage}>Prev</a>
                            </li>
                            {
                                numbers.map((n,i)=>(
                                    <li className={`page-item ${currentPage === n ? 'active' : '' }`} key={i}>
                                        <a href='#' className='page-link' onClick={()=> changeCPage(n)}>{n}</a>
                                    </li>
                                ))
                            }
                            <li className='page-item'>
                                <a href='#' className='page-link' onClick={nextPage}>Next</a>
                            </li>
                        </ul>
                    </nav> */}

<div className='modal fade' id='AddModal' tabIndex='-1' aria-hidden='true'>
    <div className='modal-dialog modal-lg modal-dialog-centered'>
        <div className='modal-content'>
            <div className='modal-header'>
                <h3 className='modal-title'>{modalTitle}</h3>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className="modal-body">
                <div className="input-group mb-3">
                    <span className="input-group-text">Department Name</span>
                    <input type="text" className="form-control" value={depName} onChange={this.changeDepName}></input>
                </div>
                {depID ===0? <button type="button" className="btn btn-primary float-start" onClick={()=>this.createClick()}>Create</button>:null}
                {depID !==0? <button type="button" className="btn btn-primary float-start" onClick={()=>this.updateClick()}>Update</button>:null}

            </div>
        </div>
    </div>
</div>


</div>
        )

        // function nextPage() {
        //     if(currentPage !== firstIndex){
        //         setCurrentPage (currentPage - 1)
        //     }
        // }

        // function prePage(){
        //     if(currentPage !== lastIndex){
        //         setCurrentPage (currentPage + 1)
        //     }
        // }

        // function changeCPage(n){
        //     setCurrentPage(n)
        // }

    }
}