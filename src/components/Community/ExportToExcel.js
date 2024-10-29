import React, { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

export function ExportToExcel() {
  const tableRef = useRef(null);
  return (
    <div>
      <DownloadTableExcel
        filename="uploadStudent"
        sheet="users"
        currentTableRef={tableRef.current}
      >

        <img src={require("../images/studnetList_template.PNG")} style={{ width: "200px" }} alt="student Template" />
        <button
          className="download_template"
          // onClick={(e) => exportToCSV(apiData, fileName)}
          style={{ fontSize: "12px", fontWeight: "400", border: "none", background: "transparent", color: "blue" }}
        >

          Download Template
        </button>

      </DownloadTableExcel>

      <table ref={tableRef} style={{display:"none"}}>
        <tbody>
          <tr>

            <th>First Name</th>
            <th>Last Name</th>
            <th>Preferred Name</th>
            <th>Father Name</th>
            <th>dob</th>
            <th>Mother Name</th>
            <th> Gender</th>
            <th>Country</th>
            <th>Mobile</th>
            <th>password</th>
            <th> First Language</th>
            <th>Class</th>
            <th>Department</th>
            <th> First Nationality</th>
            <th>Second Nationality</th>
            <th>Email</th>
            <th> Spoken Language</th>
            <th>Race</th>
            <th>persona</th>

          </tr>


        </tbody>
      </table>

    </div>
  )
}
