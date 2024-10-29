import React from "react";
import { StudentTabs } from "./StudentTabs";
export function PersonalInformation({ dataParentToChild }) {

  return (
    <div>
      <table
        style={{
          width: "100%",
          fontFamily: "Poppins",
          padding: "10px",
          marginLeft: "25PX",
          paddingBottom: "10px",
        }}
      >
        <tr style={{ width: "100%" }}>
          <td style={{ padding: "12px" }}>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "600",
                fontSize: "10px",
              }}
            >
              First Name
            </div>
            <div style={{ fontWeight: "600", fontSize: "12px" }}>
              {dataParentToChild.firstName == "" ? (
                <div>-</div>
              ) : (
                <div>{dataParentToChild.firstName}</div>
              )}
            </div>
          </td>
          <td style={{ padding: "12px" }}>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "600",
                fontSize: "10px",
              }}
            >
              Last Name
            </div>
            <div style={{ fontWeight: "600", fontSize: "12px" }}>
              {dataParentToChild.lastName == "" ? (
                <div>-</div>
              ) : (
                <div>{dataParentToChild.lastName}</div>
              )}
            </div>
          </td>
          <td style={{ padding: "12PX" }}>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "600",
                fontSize: "10px",
              }}
            >
              Gender
            </div>
            <div style={{ fontWeight: "600", fontSize: "12px" }}>
              {dataParentToChild.gender == "" ? (
                <div>-</div>
              ) : (
                <div>{dataParentToChild.gender}</div>
              )}
            </div>
          </td>
          <td style={{ padding: "12px" }}>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "600",
                fontSize: "10px",
              }}
            >
              Email Address
            </div>
            <div
              style={{ fontWeight: "600", fontSize: "11px", color: "#2b6dd4" }}
            >
              {dataParentToChild.email == "" ? (
                <div>-</div>
              ) : (
                <div>{dataParentToChild.email}</div>
              )}
            </div>
          </td>
          <td style={{ padding: "12px" }}>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "600",
                fontSize: "10px",
              }}
            >
              Date of Birth
            </div>
            <div style={{ fontWeight: "600", fontSize: "12px" }}>
              {dataParentToChild.dob == "" ? (
                <div>-</div>
              ) : (
                <div>{dataParentToChild.dob}</div>
              )}
            </div>
          </td>

          <td style={{ padding: "12px" }}>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "600",
                fontSize: "10px",
              }}
            >
              Persona
            </div>
            <div style={{ fontWeight: "600", fontSize: "12px" }}>
              {dataParentToChild.personaId == "" ? (
                <div>-</div>
              ) : (
                <div>{dataParentToChild.personaId}</div>
              )}
            </div>
          </td>
        </tr>

        <tr style={{ width: "100%", marginTop: "10PX" }}>
          <td style={{ padding: "12px" }}>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "600",
                fontSize: "10px",
              }}
            >
              Department
            </div>
            <div style={{ fontWeight: "600", fontSize: "12px" }}>
              {dataParentToChild.department == "" ? (
                <div>-</div>
              ) : (
                <div>{dataParentToChild.department}</div>
              )}
            </div>
          </td>

          <td style={{ padding: "12px" }}>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "600",
                fontSize: "10px",
              }}
            >
              Course
            </div>
            <div
              style={{ fontWeight: "600", fontSize: "13px", color: "black" }}
            >
              {dataParentToChild.course == "" ? (
                <div>-</div>
              ) : (
                <div>{dataParentToChild.course}</div>
              )}
            </div>
          </td>
          <td style={{ padding: "12PX" }}>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "600",
                fontSize: "10px",
              }}
            >
              Class
            </div>
            <div style={{ fontWeight: "600", fontSize: "12px" }}>
              {dataParentToChild.studentClass == "" ? (
                <div>-</div>
              ) : (
                <div>{dataParentToChild.studentClass}</div>
              )}
            </div>
          </td>
          <td style={{ padding: "12PX" }}>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "600",
                fontSize: "10px",
              }}
            >
              Student ID
            </div>
            <div style={{ fontWeight: "600", fontSize: "12px" }}>
              {dataParentToChild.studentId == "" ? (
                <div>-</div>
              ) : (
                <div>{dataParentToChild.studentId}</div>
              )}
            </div>
          </td>

          <td style={{ padding: "12PX" }}>
            <div
              style={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: "600",
                fontSize: "10px",
              }}
            >
              Mobile No
            </div>
            <div style={{ fontWeight: "600", fontSize: "12px" }}>
              {dataParentToChild.mobile == "" ? (
                <div>-</div>
              ) : (
                <div>{dataParentToChild.mobile}</div>
              )}
            </div>
          </td>
        </tr>

        <tr style={{ width: "100%", marginTop: "10px" }}></tr>
      </table>
    </div>
  );
}
