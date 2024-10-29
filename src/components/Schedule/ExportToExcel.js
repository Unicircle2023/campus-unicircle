import React, { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

export function ExportToExcel(apiData) {
  const tableRef = useRef(null);
  return (
    <div>
      <DownloadTableExcel
        filename="uploadStudent"
        sheet="users"
        currentTableRef={tableRef.current}
      >

        {/* <img src={require("../images/studnetList_template.PNG")} style={{ width: "200px" }} alt="student Template" /> */}
        <button
          className="download_template"
          // onClick={(e) => exportToCSV(apiData, fileName)}
          style={{ fontSize: "12px", fontWeight: "400", border: "none", background: "transparent", color: "blue" }}
        >

          Download Template
        </button>

      </DownloadTableExcel>

      <div ref={tableRef} style={{display:"none"}}></div>

    </div>
  )
}
