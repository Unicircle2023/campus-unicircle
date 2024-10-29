import React, { useState, useEffect } from "react";
import axios from "axios";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
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


export function JobDatatable() 
{
    // const [data, setData] = useState(data);
  console.log("Data", data);
    const columns = [
      { title: "Date", field: "date", editable:"false"},
        { title: "Company Name", field: "company_name"},
        { title: "Job Location", field: "job_location",
        editComponent: props => (
          <div className="form-group mx-3">
            <select
              style={{ width: "auto", marginTop:"30px",color:"black" , fontSize:"14px",background:"#f4f4f4", borderBottom:"1px solid grey",padding:"5px"}}
              // onChange={() => StatusChange(rowData._id)}
            >
             <option>Select Location</option>
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Chennai</option>
                <option>Hydrabad</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Noida</option>
                <option>Kolkata</option>
                <option>Mohali</option>
                <option>Gurgaon</option>
                <option>Ahmedabad</option>
                <option>Chandigarh</option>
               
             
            </select>
          </div>
        )
      },
        { title: "Qualification", field: "qualification"},
        { title: "Experience", field: "experience"},
        { title: "Interview Date", field: "interview_date",
        type: "date",
        editComponent: props => (
            <MuiPickersUtilsProvider utils={DateFnsUtils} 
                        locale={props.dateTimePickerLocalization}>
                   <DatePicker
                  
                          format="dd/MM/yyyy"
                          value={props.value || null}
                          onChange={props.onChange}
                          icon={<i className="cal-icon"/>}
                          label="Date Picker"
                        //   placeholder="Date Picker"
                          clearable
                          InputProps={{
                                   style: {
                                        fontSize: 13,
                                   }
                          }}
                     />
                    
              </MuiPickersUtilsProvider>
             )
      },
        { title: "Job Description", field: "job_description"}
       
      
];
const data = [
    { date:"25/06/2021",company_name: "Appzia", job_location: "Pune", qualification: "MCA", experience:"fresher",interview_date:"23/03/2021", job_description:"Lorem ipsum dolor sit amet, consectetur"},
    { date:"25/06/2021", company_name: "Appzia", job_location: "Bangalore", qualification: "MCA", experience:"fresher",interview_date:"23/03/2021", job_description:"Lorem ipsum dolor sit amet, consectetur"},
    { date:"25/06/2021", company_name: "Appzia", job_location: "Mumbai", qualification: "MCA", experience:"fresher",interview_date:"23/03/2021", job_description:"Lorem ipsum dolor sit amet, consectetur"},
    { date:"25/06/2021", company_name: "Appzia", job_location: "Delhi", qualification: "MCA", experience:"fresher",interview_date:"23/03/2021", job_description:"Lorem ipsum dolor sit amet, consectetur"},
    { date:"25/06/2021",company_name: "Appzia", job_location: "Hydrabad", qualification: "MCA", experience:"fresher",interview_date:"23/03/2021", job_description:"Lorem ipsum dolor sit amet, consectetur"},
  
];

     
    return (
        <div className="content-wrapper">
           <FormControl style={{ width: "100%" , background:"#f4f4f4", padding:"10px"}}>
        <MaterialTable
          title="Students Jobs"
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
                  <div style={{marginLeft:"0px"}}>Create Job</div>
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
