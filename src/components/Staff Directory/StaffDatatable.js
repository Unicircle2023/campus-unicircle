import React, { useState, useEffect } from "react";
import axios from "axios";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Link } from 'react-router-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker
} from "@material-ui/pickers";
import $ from "jquery";
import {BiPlusMedical} from "react-icons/bi";
import FormControl from "@material-ui/core/FormControl";
import MaterialTable from "material-table";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import SaveIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";


export function StaffDatatable() 
{
    // const [data, setData] = useState(data);
  console.log("Data", data);
    const columns = [
      { title: "Date", field: "date", editable:"false"},     
        { title: "Profile", field: "profile",
        editComponent: props => (
            <div className="form-group">
               <p style={{color:"#1F3977"}}>Upload File</p>
               <input type="file" id="myFile" name="filename" style={{width:"AUTO"}} />
             </div>
        ),
        render: (rowData) => (
  
            <div style={{borderRadius:"50%" , marginTop:"20px", marginLeft:"10px"}}>
            <img width="50%" alt="Anne Hathaway picture" src="dist/img/avatar4.png" 
            style={{borderRadius:"50%"}}/>
    </div>
        )
    },
        { title: "Teacher Name", field: "teacher_name"},
        { title: "Department", field: "department",
        editComponent: props => (
            <div className="form-group">
                <select name="subject" id="subject" className="form-select form-select-sm " aria-label=".form-select-sm example" style={{width:"auto", padding:"5px", color:"grey", borderBottom:"1PX SOLID GREY", background:"#f4f4f4", marginTop:"30px"}} >
             <option>Select Department</option>
                <option>Computer Science</option>
                <option>Electronics</option>
                <option>Information Technology</option>
                <option>English</option>
                <option>Maths</option>
                
                
            </select>
             </div>
        ),},
        { title: "Contact", field: "conatct", type:"number"},   
        { title: "Email", field: "email"},     
];
const data = [
    { date:"13/08/2021",profile: "Appzia", teacher_name: "Jhol Carol", department: "Computer Science", conatct:"7865998765", email:"jhon_123@gmail.com"},
    {  date:"13/08/2021",profile: "Appzia", teacher_name: "Jhol Carol", department: "Computer Science", conatct:"7865998765", email:"jhon_123@gmail.com"},
    {  date:"13/08/2021",profile: "Appzia", teacher_name: "Jhol Carol", department: "Computer Science", conatct:"7865998765", email:"jhon_123@gmail.com"},
    { date:"13/08/2021", profile: "Appzia", teacher_name: "Jhol Carol", department: "Computer Science", conatct:"7865998765", email:"jhon_123@gmail.com"},
    {  date:"13/08/2021",profile: "Appzia", teacher_name: "Jhol Carol", department: "Computer Science", conatct:"7865998765", email:"jhon_123@gmail.com"},
  
];

     
    return (
        <div className="content-wrapper">
         
          <Link to="/homepage" className="d-flex" style={{padding:"0", marginTop:"5px"}}>
             <i class="fa fa-angle-double-left" style={{color:"black", margin:"0px 5px 0px 10px",fontSize:"24px"}} /> 
             <p style={{fontSize:"12px", color:"black", marginTop:"5px"}}>Back</p>
            </Link>
       

           <FormControl style={{ width: "100%" , background:"#f4f4f4", padding:"10px"}}>
        <MaterialTable
          title="Staff Details"
          style={{background:"#f4f4f4"}}
          data={data}
          columns={columns}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                const updatedRows = [
                  ...data,
                  { id: Math.floor(Math.random() * 100), ...newRow },
                ];

                setTimeout(() => {
                //   setData(updatedRows);
                  console.log("data", newRow);
                  resolve();
                //   addUser(newRow);
                }, 2000);
              }),

            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.id;
                const updatedRows = [...data];
                updatedRows.splice(index, 1);
                setTimeout(() => {
                //   setData(updatedRows);
                  resolve();
                //   deleteUser(selectedRow);
                }, 2000);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const index = oldRow.tableData.id;
                const updatedRows = [...data];
                updatedRows[index] = updatedRow;
                setTimeout(() => {
                //   setData(updatedRows);
                  resolve();
                //   editUser(updatedRow);
                }, 2000);
              }),
          }}
          icons={{
            Add: () =>
            <button
                  type="button"
                  className="d-flex buttonContainer"
                  defaultValue="Sign Up"
                  style={{ padding:"8px", background:"#1F3977", flexWrap: "wrap", borderRadius:"5px"}}
                >
                  <BiPlusMedical style={{marginTop:"2px"}}/>
                  <div style={{marginLeft:"0px"}}>Add Staff</div>
</button>,

            Edit: () => <i class="fas fa-edit fa-lg" style={{ color: "green" }} />,
            Delete: () => <i class="fas fa-trash-alt fa-lg"  style={{ color: "red" }} />,
            Search: () => <SearchIcon style={{ color: "black" }} />,
            SortArrow: () => <SortIcon style={{ color: "white" }} />,
            Check: () => <SaveIcon style={{ color: "black" }} />,
            Filter: () => <ClearIcon style={{ color: "white" }} />,
            ResetSearch: () => (
              <ClearIcon style={{ color: "black", display: "none" }} />
            ),
            FirstPage: () => <FirstPageIcon style={{ color: "black" }} />,
            PreviousPage: () => (
              <NavigateBeforeIcon style={{ color: "black" }} />
            ),
            NextPage: () => <NavigateNextIcon style={{ color: "black" }} />,
            LastPage: () => <LastPageIcon style={{ color: "black" }} />,
            Clear: () => <ClearIcon style={{ color: "black" }} />,
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            cellStyle: {
              fontWeight: "400",
              width: "500px",
              textAlign: "center",
              background:"#f4f4f4"
            },
            headerStyle: {
              fontWeight: "bold",
              textAlign: "center",
              width: "100px",
              background:"#339dd8",
              color:"white"
            },
          }}
        />
      </FormControl>

      <div class="AddAlert alert alert-success">
        <li class="close list" data-dismiss="alert" aria-label="close">
          &times;
        </li>
        <h6 class="login-text text-center">Data Added Successfully</h6>
      </div>

      <div class="AddFail alert alert-danger">
        <li class="close list" data-dismiss="alert" aria-label="close">
          &times;
        </li>
        <h6 class="login-text text-center">Unable to Add Data</h6>
      </div>

      <div class="EditAlert alert alert-success">
        <li class="close list" data-dismiss="alert" aria-label="close">
          &times;
        </li>
        <h6 class="login-text text-center">Data Edited Successfully</h6>
      </div>

      <div class="EditFail alert alert-danger">
        <li class="close list" data-dismiss="alert" aria-label="close">
          &times;
        </li>
        <h6 class="login-text text-center">Unable to Edit Data</h6>
      </div>

      <div class="DeleteAlert alert alert-success">
        <li class="close list" data-dismiss="alert" aria-label="close">
          &times;
        </li>
        <h6 class="login-text text-center">Data Deleted Successfully</h6>
      </div>

      <div class="DeleteFail alert alert-danger">
        <li class="close list" data-dismiss="alert" aria-label="close">
          &times;
        </li>
        <h6 class="login-text text-center">Unable to Deleted Data</h6>
      </div>
        </div>
    )
}
