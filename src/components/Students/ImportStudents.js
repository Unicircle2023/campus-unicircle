// import React, { useState } from 'react'
// import DataTable from 'react-data-table-component'
// // import {ExcelRenderer, OutTable} from 'react-excel-renderer';
// // import * as XLSX from "xlsx"

// // exit * as XLSX from "xlsx"

// const ImportStudents = () => {

//     // const items = [
//     //     {
//     //         id: "1",
//     //         first_name: "test",
//     //         last_name: "entry",
//     //         preffered_name: "testentry"
//     //     },
//     //     {
//     //         id: "2",
//     //         first_name: "hey",
//     //         last_name: "there",
//     //         preffered_name: "heythere"
//     //     },
//     //     {
//     //         id: "3",
//     //         first_name: "hey",
//     //         last_name: "there",
//     //         preffered_name: "heythere"
//     //     },
//     // ];

//     const [items, setItems] = useState([])
//     const columns = [
//         {
//             // id: "",
//             // user_role: "",
//             // user_id: "",
//             // campus_id: "",
//             // first_name: "",
//             // last_name: "",
//             // preffered_name: "",
//             // profile: ""
//             name: 'id',
//             selector:row=>row.id,
//             sortable: true,
//         },
//         {
//             name:"first_name",
//             selector: row=>row.first_name,
//             sortable: true,
//         },
//         {
//             name:"last_name",
//             selector: row=>row.last_name,
//             sortable: true,
//         },
//         {
//             name:"preffered_name",
//             selector: row => row.preffered_name,
//             sortable: true,
//         }
//     ];

//     const readExcel = (files) => {
//          const promise = new Promise((resolve, reject) => {
//              const fileReader = new FileReader();
//              fileReader.readAsArrayBuffer(files)
 
//              fileReader.onload = (e) => {
//                  const bufferArray = e.target.result;
 
//                  const wb = XLSX.read(bufferArray, { type: 'buffer' });
 
//                  const wsname = wb.SheetNames[0]
 
//                  const ws = wb.Sheets[wsname];
 
//                  const data = XLSX.utils.sheet_to_json(ws)
 
//                  resolve(data);
 
//              }
 
//              fileReader.onerror = (error) => {
//                  reject(error);
//              }
//          })
 
//          promise.then((d) => {
//              setItems(d);
//              {console.log(d);}
//          });
         
//      }
//     return (
//         <div className="content-wrapper">
//             <h4>Import Students</h4>
//             <div className="App">
//                 <input type="file" style={{}} onChange={(e) => {
//                     const files = e.target.files[0]
//                     readExcel(e)
//                 }} />
//             </div>
//                 <br/><br/>
//             {/* <table class="table text-center">
//                 <thead>
//                     <tr>
//                         <th scope="col">Id</th>
//                         <th scope="col">First Name</th>
//                         <th scope="col">Last Name</th>
//                         <th scope="col">Preferred name</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         items.map((d) => (
//                             <tr>
//                                 <td>{d.id}</td>
//                                 <td>{d.first_name}</td>
//                                 <td>{d.last_name}</td>
//                                 <td>{d.preffered_name}</td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </table> */}
//             {console.log("currently showing dummy data in the table as i still cannot figure out how to use xlsx package in this module")}
//             <DataTable
//                 columns = {columns}
//                 data = {items}
//                 selectableRows
//                 pagination
//             />

//             <button onClick = {()=>alert("uploading...")} >Upload data</button>

//         </div>
//     )
// }

// export default ImportStudents