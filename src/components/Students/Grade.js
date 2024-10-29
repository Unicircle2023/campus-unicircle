// import React ,{useState}from 'react'
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend
//   } from "recharts";

// export function Grade() {

//     const [examMarks, updateExamMarks] = useState([])
// const [errorCode, updateErrorCode] = useState("")
// const [errorMessage, updateErrorMessage] = useState("")
//   async function fetchMarks(e) {
//     updateExamId(e.target.value)
      

//         const formData = new FormData();
//         formData.append("student_id",dataParentToChild.studentId);
//         formData.append("exam_id", e.target.value);
      
//         const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_get_student_exam_mark",
//           formData,
//           {
//             headers:
//             {
//               "Content-Type": 'multipart/form-data',
              
//               "Authorization": token,
//             }
//           });

//         console.log("Todats schedule", response.data.data);
//         updateErrorCode(response.data.error_code)
//         updateErrorMessage(response.data.message)
//         if(response.data.error_code == 200)
//         {
//           updateExamMarks(response.data.data)
//         }
//     }


//   function showMoreTimetable()
//   {
//     window.location.href= "/schedule"
//   }

  
//   var subjectName = [];
//   var m = [];
//   examMarks.map((item) => {
//     subjectName.push(item.subject_id);
//     m.push(item.mark);
//   });


// var arr = [];

// for (let i = 0; i <= m.length; i++) {

//      var obj = {
//          name: subjectName,
//         pv :m[i]
//      };

//       arr.push(obj);
// }
// console.log("get gradessss", arr);
// const examData = arr;
//     return (
//        <div>
//         <BarChart
//               width={300}
//               height={200}
//               data={examData}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="pv" fill="#8884d8" />
              
//             </BarChart>
//         </div>
//     )
// }
