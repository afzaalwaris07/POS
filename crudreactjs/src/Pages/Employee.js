import React, {Component} from 'react';
import { variables } from '../Variables.js';

export class Employee extends Component{
    constructor(props){
        super(props);

        this.state={
            departments:[],
            employees:[],
            modalTitle:"",
            empID:0,
            empName:"",
            depID:0,
            depName:"",
            dateOfJoining:"",
            photo:"anonymous.png",
            photoPath:variables.PHOTO_Url,

            EmpIdFilter:"",
            EmpNameFilter:"",
            DepIdFilter:"",
            DepNameFilter:"",
            DOJFilter:"",
            EmployeesWithoutFilter:""
        }
    }


    FilterFn(){
        var EmpIdFilter = this.state.EmpIdFilter;
        var EmpNameFilter = this.state.EmpNameFilter;
        var DepIdFilter = this.state.DepIdFilter;
        var DepNameFilter = this.state.DepNameFilter;
        var DOJFilter = this.state.DOJFilter;

        var filteredData = this.state.EmployeesWithoutFilter.filter(
            function(emp){
                return emp.id.toString().toLowerCase().includes(
                    EmpIdFilter.toString().trim().toLowerCase()
                )&&
                emp.name.toString().toLowerCase().includes(
                    EmpNameFilter.toString().trim().toLowerCase()
                )&&
                emp.departmentID.toString().toLowerCase().includes(
                    DepIdFilter.toString().trim().toLowerCase()
                )&&
                emp.department.toString().toLowerCase().includes(
                    DepNameFilter.toString().trim().toLowerCase()
                )&&
                emp.dateOfJoining.toString().toLowerCase().includes(
                    DOJFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({employees:filteredData})
    }
    changeEmpIdFilter=(e)=>{
        this.state.EmpIdFilter = e.target.value;
        this.FilterFn();
    }
    changeEmpNameFilter=(e)=>{
        this.state.EmpNameFilter = e.target.value;
        this.FilterFn();
    }
    changeDepIdFilter=(e)=>{
        this.state.DepIdFilter = e.target.value;
        this.FilterFn();
    }
    changeDepNameFilter=(e)=>{
        this.state.DepNameFilter = e.target.value;
        this.FilterFn();
    }
    changeDOJFilter=(e)=>{
        this.state.DOJFilter = e.target.value;
        this.FilterFn();
    }


    refreshList(){
        fetch(variables.API_Url+'Department').then(Response=>Response.json()).then(data=>{this.setState({departments:data})});
        
        fetch(variables.API_Url+'Employee').then(Response=>Response.json())
        .then(data=>{this.setState({employees:data,EmployeesWithoutFilter:data})});
    }
    
    componentDidMount(){
        this.refreshList();
    }

    changeEmpName=(e)=>{
        this.setState({empName:e.target.value});
    }
    changeDepartment=(e)=>{
        this.setState({depName:e.target.value});
    }
    changeDateOfJoining=(e)=>{
        this.setState({dateOfJoining:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Employee",
            empID:0,
            empName:"",
            depID:0,
            depName:"",
            dateOfJoining:"",
            photo:"anonymous.png"
        });
    }
    editClick(emp){
        this.setState({
            modalTitle:"Edit Employee",
            empID:emp.id,
            empName:emp.name,
            depID:emp.departmentID,
            depName:emp.department,
            dateOfJoining:emp.dateOfJoining,
            photo:emp.photo,

        });
    }
    createClick(){
        fetch(variables.API_Url+'Employee', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }, 
            body:JSON.stringify({
                Name:this.state.empName,
                DepartmentID:this.state.depID,
                Department:this.state.depName,
                DateOfJoining:this.state.dateOfJoining,
                Photo:this.state.photo
            })
        })
        .then(Response=>Response.json())
        .then(
            (result)=>{alert(result);this.refreshList();},
            (error)=>{alert("Failed");
        })
    }
    updateClick(){
        fetch(variables.API_Url+'Employee',{
            method:'PUT',
            headers:{'Accept':'appicaion/json','Content-Type':'application/json'},
            body:JSON.stringify({
                ID:this.state.empID,
                Name:this.state.empName,
                DepartmentID:this.state.depID,
                Department:this.state.depName,
                DateOfJoining:this.state.dateOfJoining,
                Photo:this.state.photo
            })
        })
        .then(Response=>Response.json())
        .then(
            (result)=>{alert(result);this.refreshList();},
            (error)=>{alert('Failed')}
        )
    }
    deleteClick(id){
        if(window.confirm('Are you sure to delete this record?')){
        fetch(variables.API_Url+'Employee/'+id,{
            method:'DELETE',
            headers:{'Accept':'application/json','Content-Type':'application/json'}
            
        })
        .then(Response=>Response.json())
        .then(
            (result)=>{alert(result);this.refreshList();},
            (error)=>{alert('Failed')}
        )
    }
    }
    uploadPhoto=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);
        fetch(variables.API_Url+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(Response=>Response.json())
        .then(data=>{
            this.setState({photo:data});
        })

    }


    render (){
        const {
            departments,
            employees,
            modalTitle,
            empID,
            empName,
            depID,
            depName,
            dateOfJoining,
            photo,
            photoPath
        }=this.state;

        return (
            <div>
            <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target='#AddEmpModal'           
            onClick={()=>this.addClick()}>Add Employee</button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <input className='m-2 form-control' onChange={this.changeEmpIdFilter} placeholder='Filter By ID'></input>
                                ID</th>
                            <th>
                                <input className='m-2 form-control' onChange={this.changeEmpNameFilter} placeholder='Filter By Name'></input>
                                Name</th>
                            <th>
                                <input className='m-2 form-control' onChange={this.changeDepIdFilter} placeholder='Filter By Department Name'></input>
                                Department ID</th>
                            <th>
                                <input className='m-2 form-control' onChange={this.changeDepNameFilter} placeholder='FIlter By Department Name'></input>
                                Department</th>
                            <th>
                                <input className='m-2 form-control' onChange={this.changeDOJFilter} placeholder='Filter By DOJ'></input>
                                Date Of Joining</th>
                            <th>Photo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp=>
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.departmentID}</td>
                                <td>{emp.department}</td>
                                <td>{emp.dateOfJoining}</td>
                                <td>{emp.photo}</td>
                                <td>
                                    <button type='button' className='btn btn-light mr-1' data-bs-toggle='modal' data-bs-target='#AddEmpModal' onClick={()=>this.editClick(emp)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                    <button type='button' className='btn btn-light mr-1' onClick={()=>this.deleteClick(emp.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

<div className='modal fade' id='AddEmpModal' tabIndex="-1" aria-hidden="true">
    <div className='modal-dialog modal-lg modal-dialog-centered'>
        <div className='modal-content'>
            <div className='modal-header'>
                <h3 className='modal-title'>{modalTitle}</h3>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
            <div className='d-flex flex-row bd-highlight mb-3'>
                <div className='p-2 w-50 bd-highlight'>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'>Employee Name</span>
                        <input type='text' className='form-control' value={empName} onChange={this.changeEmpName}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'>Department Name</span>
                        <select className='form-select' onChange={this.changeDepartment} value={depName}>
                            <option key={0}>--Select--</option>
                            {departments.map(dep=><option key={dep.id}>{dep.name}</option>)}
                        </select>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'>DOJ</span>
                        <input type='date' className='form-control' value={dateOfJoining} onChange={this.changeDateOfJoining}></input>
                    </div>
                </div>
                <div className='p-2 w-50 bd-highlight'>
                    <img width="250px" height="250px" src={photoPath+photo}/>
                    <input type='file' className='m-2' onChange={this.uploadPhoto}></input>
                </div>
            </div>
                {empID==0? <button type='button' className='btn btn-primary float-start' onClick={()=>this.createClick()}>Create</button>:null}
                {empID !=0? <button type='button' className='btn btn-primary float-start' onClick={()=>this.updateClick()}>Update</button>:null}
            </div>
        </div>
    </div>
</div>

            </div>
        )
    }
}