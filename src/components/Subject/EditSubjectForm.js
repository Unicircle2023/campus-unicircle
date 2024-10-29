import React from 'react'
import { withRouter } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";

function EditSubjectForm(props) {
    const [data, setData] = useState([])

    const token = localStorage.getItem('Token');
  
    console.warn("props", props.match.params.subject_id)


    async function fetchList() {
        console.log("Access Token-", token);
        try {

            const fetchResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_single_subject/" +props.match.params.subject_id,
                {
                    headers:
                    {
                        "Content-Type": 'multipart/form-data',

                        "Authorization": token,
                    }
                }
            );

            console.log("Get Subject Id Details", fetchResponse);

            const SubjectIdCode = fetchResponse.data.error_code;
            console.log("Subject Id Code ", SubjectIdCode);

            const SubjectErrorMsg = fetchResponse.data.message;
            console.log("Subject Id Error msg ", SubjectErrorMsg);


            if (SubjectIdCode == 200) {
                const subjectIdListArray = fetchResponse.data.data;
                console.log("Subject ID list Array", subjectIdListArray);
                setData(subjectIdListArray);
            }
            else {
                setData([]);

                console.log(fetchResponse.data.message);
                $(".alert-danger").show();
                setTimeout(function () {
                    $(".alert-danger").hide();
                }, 3000);
            }

        }
        catch (err) {
            console.log("Log in Fail", err);

        }

    }

    useEffect(() => {

        fetchList();
    }, []);

    return (
        <div>
            {data.subject_name}
            <input type="text" value={data.subject_name} /><br></br>
            <button>Update</button>
        </div>
    )

}

export default withRouter(EditSubjectForm)