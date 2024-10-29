import React from "react";
// import { InformationTab } from "./InformationTab";
// import { StudentTabs } from "./StudentTabs";

import DonutChart from "react-donut-chart";
import "@patternfly/react-core/dist/styles/base.css";



export function RightPart() {
  return (
    <div style={{padding:"30px 15px",width:"18%",fontWeight:"500",fontSize:"8PX",lineHeight:"12px"}}>
        <p style={{marginTop:"10px"}}>
        ID: This column displays the auto generated serial ID of submitted question in the knowledge base.
        </p>

        <p style={{marginTop:"10px"}}>
Subject: This column displays the subject of the submitted ticket by which admin user can get an idea regarding the topic. You can click on the subject to preview ticket contents along with ticket history.
</p>


<p style={{marginTop:"10px"}}>
Requested By: This column displays name of the user who has submitted the question in the knowledge base. Click on the name to send an email to the user.
</p>

<p style={{marginTop:"10px"}}>
Priority: This column displays the priority of ticket submitted by the user. Priority is the level of importance of the question in the knowledge base. KB users are allowed to choose between four different statuses of priorities from low to urgent stating lower importance tickets to urgent attention tickets. Different colored flags are displayed along with the different level of priority. Blue states low priority and Red indicates higher priority tickets.
</p>


<p style={{marginTop:"10px"}}>
Priority: This column displays the level of priority from low to high. 
</p>


<p style={{marginTop:"10px"}}>
Actions: This column displays a drop-down list of actions that can be performed on these tickets. These actions are:
Reply Back - Click to send an answer to the user. Refer article Sending reply to a ticket for more details. This option is available for open tickets only.
</p>

<p style={{marginTop:"10px"}}>
Publish - Click to publish an open ticket as an article in the knowledge base so that other users need not ask the same question in future. Refer article Publishing a ticket as an article in knowledge base to details on how to publish ticket as an article. You can publish an open ticket only.
</p>

<p style={{marginTop:"10px"}}>
Close - Click to close an open ticket.
</p>

<p style={{marginTop:"10px"}}>
Reopen - Click to reopen a closed ticket.
</p>

<p style={{marginTop:"10px"}}>
Delete - Click this to permanently remove the ticket from the knowledge base.
</p>

    </div>
  )
}
