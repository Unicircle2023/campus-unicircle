import React, { useState, useEffect } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import { RightPart } from './RightPart';
import axios from "axios"

export function ExploreGroupsNew() {

    const token = localStorage.getItem('Token');
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [hrs, sethrs] = useState("");
    const [data, setData] = useState([]);

    async function addticketCategory() {

        try {

            const formData = new FormData();

            formData.append("t_cat", name);
            formData.append("description", description);
            formData.append("hour", hrs);

            const response = await axios.post(process.env.REACT_APP_API_KEY + "admin_add_ticket_category",
                formData,
                {
                    headers:
                    {
                        "Content-Type": 'multipart/form-data',

                        "Authorization": token,
                    }
                });

            console.log("Create Ticket Category", response);

            setName("");
            setDescription("");
            sethrs("");


        }
        catch (err) {
            console.log("Log in Fail", err);

        }


    }

    async function fetchTicketCategoryList() {

        try {

            const fetchTicketResponse = await axios.get(process.env.REACT_APP_API_KEY + "admin_get_all_ticket_category",
                {
                    headers:
                    {
                        "Content-Type": 'multipart/form-data',

                        "Authorization": token,
                    }
                }
            );

            console.log("Get Ticket category Details", fetchTicketResponse);

            const ticketData = fetchTicketResponse.data.data;
            console.log("Ticket category List ", ticketData);
            setData(ticketData);


        }
        catch (err) {
            console.log("Log in Fail", err);

        }

    }

    data.map((item, index) => {
        console.log("ticket item", item)
    }

    )

    useEffect(() => {
        fetchTicketCategoryList();
    }, []);

    return (
        <div className="content-wrapper" style={{ background: "#ebedef" }}>
            <a href="/ticketsDashboard" >
                <div className="d-flex" style={{ padding: "0", margin: "0" }}>
                    <i class="fas fa-arrow-alt-circle-left" style={{ color: "black", margin: "0px 0px 0px 10px", fontSize: "24px", padding: "0", fontWeight: "bold" }} />
                </div>
            </a>

            <div className="d-flex" style={{ margin: "5px 20px 10px 20px" }}>
                <div>
                    <h4 style={{ color: "black", fontWeight: "bold", marginTop: "0" }}>
                        TICKETS
                    </h4>
                    <div style={{ fontSize: "11PX", color: "darkgrey" }}>
                        Create customizable badges to award any kind of skill, achievement or accomplishment you can think
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-9'>
                    <div className="d-flex" style={{ width: "100%" }}>
                        <div style={{ width: "100%", marginLeft: "-2px", background: "white", padding: "10px" }}>
                            <div className="d-flex" style={{ margin: "0px 20px" }}>
                                <h1 style={{ fontWeight: "bold" }}>Groups</h1>
                                <a href="#popup3" style={{ marginLeft: "AUTO" }}>
                                    <button
                                        type="button"
                                        className='grp-button'
                                        style={{
                                            padding: "5px 15PX",
                                            fontSize: "12PX",
                                            border: "none",
                                            marginLeft: "auto",
                                            background: "#293043",

                                            color: "white",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        New Group
                                    </button>
                                </a>
                                {/* CREATE roup pop up */}
                                <div id="popup3" class="overlay" style={{ zIndex: "2", top: "10px" }}>
                                    <div class="popup">

                                        <form role="form">
                                            <div className="card-body" style={{ marginTop: "0px" }} >
                                                <div style={{ width: "100%" }}>
                                                    <h2 style={{ color: "black", fontSize: "20PX", fontWeight: "bold" }}>New Group</h2>
                                                    {/* CATEGORY */}
                                                    <div className="form-group" style={{ marginTop: "10px" }}>
                                                        <label htmlFor="exampleInputEmail1" style={{ color: "#1F3977", fontSize: "12PX" }}>Name*</label>
                                                        <input
                                                            type="name"
                                                            className="border"
                                                            id="exampleInputEmail1"
                                                            placeholder="e.g. Refund group"
                                                            autoComplete="true"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            style={{ width: "100%", height: "35px" }}

                                                        />
                                                    </div>

                                                    <div className="form-group" style={{ marginTop: "0px" }}>
                                                        <label htmlFor="exampleInputEmail1" style={{ color: "#1F3977", fontSize: "12PX" }}>Description</label>
                                                        <textarea
                                                            type="name"
                                                            rows="4"
                                                            id="exampleInputEmail1"
                                                            placeholder="e.g. This group will answer all queries related to refunds"
                                                            autoComplete="true"
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            style={{ width: "100%", height: "80px", padding: "5px", border: "1px solid #e2e6e9" }}

                                                        />
                                                    </div>

                                                    <div className="form-group" style={{ marginTop: "0px" }}>
                                                        <label htmlFor="exampleInputEmail1" style={{ color: "#1F3977", fontSize: "12PX" }}>Business hours</label>
                                                        <select value={hrs}
                                                            onChange={(e) => sethrs(e.target.value)} className="form-select form-select-sm " aria-label=".form-select-sm example" style={{ width: "100%", padding: "5px", fontSize: "12px", color: "grey", border: "1px solid #e2e6e9" }}>
                                                            <option selected>Select Category</option>
                                                            <option value="8-5">8-5</option>
                                                            <option value="9-6">9-6</option>
                                                            <option value="10-7">10-7</option>

                                                        </select>
                                                    </div>


                                                    <div className="mt-3 d-flex" style={{ background: "#f3f5f7" }}>
                                                        {/* <input type="checkbox" style={{ marginTop: "20PX" }} /> */}
                                                        {/* <p style={{ fontSize: "12PX", marginTop: "20PX", marginLeft: "10PX" }}>Add agents in the next step</p> */}
                                                        <input
                                                            type="button"
                                                            className="create_btn"
                                                            defaultValue="Sign Up"
                                                            value="Cancel"
                                                            style={{ marginLeft: "auto", borderRadius: "5px", backgroundColor: "#F7F8FA", color: "#606e7c", border: "1px solid #e2e6e9", height: "38px" }}
                                                        />

                                                        <input
                                                            type="button"
                                                            className="create_btn"
                                                            defaultValue="Sign Up"
                                                            value="Create"
                                                            onClick={() => addticketCategory()}
                                                            style={{ borderRadius: "5px", backgroundColor: "#1F3977", height: "38px" }}
                                                        />

                                                    </div>

                                                </div>
                                            </div>
                                        </form>
                                        <b><a class="close" href="#" style={{ fontWeight: "normal", paddingTop: "7px", marginRight: "4px" }}>&times;</a></b>

                                    </div>
                                </div>
                                {/* end group pop up */}
                            </div>

                            <div className="d-flex flex-row" style={{ margin: "5PX 20px 0px 20px" }}>
                                <div>

                                    <div className="d-flex group-input" style={{ padding: "0", width: "300px", height: "32px", marginTop: "0px", border: "1px solid #c5c6d0", borderRadius: "5px" }}>
                                        <div style={{ padding: "2px" }}><BiSearchAlt2 style={{ color: "#293043", fontSize: "20px", marginTop: "0px" }} /></div>
                                        <div className='' style={{ padding: "0px", width: "100%", height: "35px" }}><input type="text" placeholder="Search groups" style={{ border: "none", background: "white", height: "28px", width: "90%" }} /></div>
                                    </div>

                                </div>
                                <div className='grp-label' style={{ background: "#f6f7f9", padding: "5px", marginLeft: "AUTO", fontSize: "13PX" }}>1-8 of 8</div>
                            </div>

                            {/* <div className='row'>
                                <div className='col-md-10 d-flex flex-row' style={{ margin: "5PX 20px 0px 20px" }}>
                                    <div className="d-flex" style={{ padding: "0", width: "300px", height: "32px", marginTop: "0px", border: "1px solid #c5c6d0", borderRadius: "5px" }}>
                                        <div style={{ padding: "2px" }}><BiSearchAlt2 style={{ color: "#293043", fontSize: "20px", marginTop: "0px" }} /></div>
                                        <div style={{ padding: "0px", width: "100%", height: "35px" }}><input type="text" placeholder="Search groups" style={{ border: "none", background: "white", height: "28px", width: "90%" }} /></div>
                                    </div>
                                </div>

                                <div className='col-md-2'>
                                    <div style={{ background: "#f6f7f9", padding: "5px", marginLeft: "AUTO", fontSize: "13PX" }}>1-8 of 8</div>
                                </div>

                            </div> */}

                            <div className="card-body" style={{ marginTop: "0PX", paddingTop: "10PX", overflowX: "auto" }}>
                             
                                          
                                      
                                <table className="table table-striped" id="example"
                                    style={{ backgroundColor: "#f6f7f9", color: "black", height: "100px", width: "100%", padding: "0px", marginTop: "0" }}>
                                    <thead style={{ background: "white" }}>
                                        <tr style={{ padding: "10px", marginBottom: "10px", borderBottom: "none", background: "#f6f7f9" }}>

                                            <td style={{ textAlign: "left", width: "40%", borderBottom: "none", fontSize: "13px", fontWeight: "600" }} >
                                                Name
                                            </td>
                                            <td style={{ textAlign: "left", width: "20%", borderBottom: "none", fontSize: "13px", fontWeight: "600" }} >
                                                Agents
                                            </td>
                                            <td style={{ textAlign: "left", width: "40%", borderBottom: "none", fontSize: "13px", fontWeight: "600" }} >
                                                Business hours
                                            </td>

                                        </tr>
                                    </thead>
                              
                                    {
                                    data.map((item, index) => {
                                        return (
                                    <tbody style={{ width: "100%" }}>
                                        <tr style={{ padding: "0" }}><td colspan="6" style={{ backgroundColor: "#EFF6FF", border: "none", padding: "0px", margin: "7px" }}></td></tr>
                                        <tr className="text-center" style={{ background: "white" }}>

                                            <td style={{ padding: "10px", borderTop: "0", float: "left" }}><li className="list-inline-item">
                                                <p style={{ fontSize: "13PX", color: "black", fontWeight: "600", textAlign: "left" }}>{item.cat_name}</p>
                                                <p style={{ fontSize: "12PX", color: "grey", textAlign: "left" }}>{item.description}</p>
                                            </li></td>
                                            <td style={{ padding: "10px", borderTop: "0", textAlign: "left" }}><li className="list-inline-item" >0</li></td>
                                            <td style={{ padding: "10px", borderTop: "0", textAlign: "left" }}><li className="list-inline-item">{item.hour}</li></td>

                                        </tr>

                                    </tbody>
                                    )
                                }

                                )
                            }
                                </table>
                                
                            </div>


                        </div>

                    </div>
                </div>

                <div className='col-md-3 grp-align'>
                    <RightPart />
                </div>

            </div>
        </div>
    )
}
