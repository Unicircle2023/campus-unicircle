import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';


// Login
import { Login } from './components/Login/Login';
import { Forgotpassword } from './components/Login/Forgotpassword';
import { ResetYourPassword } from './components/Login/ResetYourPassword';
import { SecurityCode } from './components/Login/SecurityCode';
import { NewPassword } from './components/Login/NewPassword';


// dashboard
import { Homepage } from './components/Homepage';
import { CampusNews } from './components/Campus News/CampusNews';
import { CreateNews } from './components/Campus News/CreateNews';
import { NewsPreview } from './components/Campus News/NewsPreview';
import { UploadStudent } from './components/Students/UploadStudent';
import { Event } from './components/Events/Event';
import { EventPreview } from './components/Events/EventPreview';
import { Student } from './components/Students/Student';
import { AddStudent } from './components/Students/AddStudent';
import impStudents from './components/Students/impStudents';

import { ViewStudent } from './components/Students/ViewStudent';

import { FaqDetails } from "./components/FAQ/FaqDetails";
import { CreateFaq } from "./components/FAQ/CreateFaq";

import { StaffDetails } from './components/Staff Directory/StaffDetails';
import { AddStaff } from './components/Staff Directory/AddStaff';
import { ViewProfile } from './components/Staff Directory/ViewProfile';
import { JobDetails } from './components/Job/JobDetails';
import { CreateJob } from './components/Job/CreateJob';
import { ViewJob } from './components/Job/ViewJob';
import { JobPreview } from './components/Job/JobPreview';
import { DepartmentDetails } from './components/Department/DepartmentDetails';
import { CreateDepartment } from './components/Department/CreateDepartment';
import { MarketplaceDetails } from './components/Marketplace/MarketplaceDetails';
import { SellItem } from './components/Marketplace/SellItem';
import { MarketPlaceStep2 } from './components/Marketplace/MarketPlaceStep2';
import { ViewMarketDetails } from './components/Marketplace/ViewMarketDetails';
import { ViewItem } from './components/Marketplace/ViewItem';
import { TicketsDashboard } from './components/Tickets/TicketsDashboard';
import { Groups } from './components/Tickets/Groups';

import { Calender } from './components/Calender/Calender';
import { Community } from "./components/Community/Community";
import { CreateGroup } from "./components/Community/CreateGroup";
import { Club } from "./components/Community/Club";
import { ListOfCommunity } from "./components/Community/ListOfCommunity";
import { Invite } from './components/Community/Invite';

import { AppointmentDetails } from './components/Appointment/AppointmentDetails';
import { CreateAppoinment } from './components/Appointment/CreateAppoinment';
import { Polls } from './components/Polls/Polls';
import { CreatePoll } from './components/Polls/CreatePoll';
import { PollsFormStep2 } from './components/Polls/PollsFormStep2';
import { PollsFormStep3 } from './components/Polls/PollsFormStep3';
import { PollsFormStep4 } from './components/Polls/PollsFormStep4';

import { Exam } from './components/Exam/Exam';
import { Explore } from './components/Tickets/Explore';

import { UploadExam } from './components/Exam/UploadExam';
import { CreateEvent } from './components/Events/CreateEvent';
import { CourseDetails } from './components/Course/CourseDetails';
import { CreateCourse } from './components/Course/CreateCourse'
import { ClassDetails } from './components/Class/ClassDetails';
import { CreateClass } from './components/Class/CreateClass';
import { MapDetails } from './components/Map/MapDetails';
import { SubjectDetails } from './components/Subject/SubjectDetails';
import { CreateSubject } from './components/Subject/CreateSubject';
import { ChangePassword } from './components/ChangePassword';
import { DisplayHelp } from './components/Help&Support/DisplayHelp';
import NewTimeTable from './components/Schedule/NewTimeTable'
// schedule
import { Schedule } from './components/Schedule/Schedule';
import { AddSchedule } from './components/Schedule/AddSchedule';
// import {DisplaySchedule} from './components/Schedule/DisplaySchedule';
import { Timetable } from './components/Schedule/Timetable';

import { Profile } from '../src/components/Profile/Profile';
// import {Chat} from './components/Chat/Chat';
import { AddExam } from './components/Exam/AddExam';
import { ExamForm2 } from './components/Exam/ExamForm2';
import { ExamForm3 } from './components/Exam/ExamForm3';


// import {MapDetails} from './components/Map/MapDetails';
import { CreateMapDetails } from './components/Map/CreateMapDetails';
import Summernote from './components/Summernote';
import { ReactToaster } from './components/Toasters/ReactToaster';
import { FeedHomePage } from './components/Feed/FeedHomePage';

import { flaggedContents } from './components/Flagged Contents/flaggedContents';
// import {CreateNewPassword} from './components/CreateNewPassword'
// import {Forgotpassword} from './components/Forgotpassword';


// import {NewForgotPassword} from "./components/NewForgotPassword"


ReactDOM.render(

  <Router>
    <Switch>

      {/* login */}
      <Route exact path="/" component={Login} />
      <Route exact path="/forgotpassword" component={Forgotpassword} />
      <Route exact path="/resetYourPassword" component={ResetYourPassword} />
      <Route exact path="/securityCode" component={SecurityCode} />
      <Route exact path="/newPassword" component={NewPassword} />

      {/* Home */}
      <Route exact path="/homepage" component={Homepage} />

      {/* Calendar */}

      {/* student */}
      <Route exact path="/student" component={Student} />
      <Route exact path="/addStudent" component={AddStudent} />
      <Route exact path="/impStudents" component={impStudents} />

      <Route exact path="/uploadFile" component={UploadStudent} />
      <Route exact path="/viewStudent" component={ViewStudent} />

      {/* Teacher */}
      <Route exact path="/uploadFileExam" component={UploadExam} />
      <Route exact path="/exam" component={Exam} />
      {/* Lecture */}

      {/* news */}
      <Route exact path="/campusNews" component={CampusNews} />
      <Route exact path="/createNews" component={CreateNews} />
      <Route exact path="/newspreview" component={NewsPreview} />

      {/* events */}

      {/* polls */}

      {/* community */}
      <Route exact path="/createGroup" component={CreateGroup} />
      <Route exact path="/club" component={Club} />
      <Route exact path="/listOfCommunity" component={ListOfCommunity} />
      <Route exact path="/invite" component={Invite} />

      <Route exact path="/event" component={Event} />
      <Route exact path="/createEvent" component={CreateEvent} />
      <Route exact path="/eventpreview" component={EventPreview} />


      <Route exact path="/faqDetails" component={FaqDetails} />
      <Route exact path="/createFaq" component={CreateFaq} />

      <Route exact path="/teachers" component={StaffDetails} />
      <Route exact path="/newTeacher" component={AddStaff} />
      <Route exact path="/viewProfile" component={ViewProfile} />
      <Route exact path="/jobDetails" component={JobDetails} />
      <Route exact path="/createJob" component={CreateJob} />
      <Route exact path="/viewJob" component={ViewJob} />
      <Route exact path="/jobpreview" component={JobPreview} />
      <Route exact path="/departmentDetails" component={DepartmentDetails} />
      <Route exact path="/createDepartment" component={CreateDepartment} />
      <Route exact path="/marketplaceDetails" component={MarketplaceDetails} />
      <Route exact path="/sellItem" component={SellItem} />
      <Route exact path="/marketplaceStep2" component={MarketPlaceStep2} />
      <Route exact path="/viewMarketDetails" component={ViewMarketDetails} />
      <Route exact path="/viewItem" component={ViewItem} />

      <Route exact path="/ticketsDashboard" component={TicketsDashboard} />
      <Route exact path="/groups" component={Groups} />
      <Route exact path="/community" component={Community} />
      <Route exact path="/calender" component={Calender} />
      <Route exact path="/explore" component={Explore} />

      <Route exact path="/appointmentDetails" component={AppointmentDetails} />
      <Route exact path="/createAppoinment" component={CreateAppoinment} />
      <Route exact path="/polls" component={Polls} />
      <Route exact path="/createPoll" component={CreatePoll} />
      <Route exact path="/pollsFormStep2" component={PollsFormStep2} />
      <Route exact path="/pollsFormStep3" component={PollsFormStep3} />
      <Route exact path="/pollsFormStep4" component={PollsFormStep4} />


      <Route exact path="/courseDetails" component={CourseDetails} />
      <Route exact path="/createCourse" component={CreateCourse} />

      <Route exact path="/classDetails" component={ClassDetails} />
      <Route exact path="/createClass" component={CreateClass} />

      <Route exact path="/mapDetails" component={MapDetails} />

      <Route exact path="/createMapDetails" component={CreateMapDetails} />

      <Route exact path="/profile" component={Profile} />


      <Route exact path="/changePassword" component={ChangePassword} />
      <Route exact path="/displayHelp" component={DisplayHelp} />

      <Route exact path="/subjectDetails" component={SubjectDetails} />
      <Route exact path="/createSubject" component={CreateSubject} />

      {/* schedule */}
      <Route exact path="/schedule" component={Schedule} />
      <Route exact path="/createSchedule" component={AddSchedule} />
      {/* <Route exact path="/displaySchedule" component={DisplaySchedule}/> */}
      <Route exact path="/timetable" component={Timetable} />
      {/* <Route exact path="/timetable" component={NewTimeTable}/> */}

      {/* <Route exact path="/chat" component={Chat}/> */}
      <Route exact path="/addExam" component={AddExam} />

      <Route exact path="/examForm2" component={ExamForm2} />
      <Route exact path="/examForm3" component={ExamForm3} />
      <Route exact path="/summernote" component={Summernote} />
      <Route exact path="/reacttoaster" component={ReactToaster} />

      {/* Feed */}
      <Route exact path="/feedHomePage" component={FeedHomePage} />
      <Route exact path="/flaggedcontents" component={flaggedContents} />
      {/* <Route exact path="/CreateNewPassword" component={CreateNewPassword}/> */}
      {/* <Route exact path="/forgotpassword" component={Forgotpassword}/> */}
      {/* <Route exact path="/NewForgotPassword" component={NewForgotPassword}/> */}

    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
