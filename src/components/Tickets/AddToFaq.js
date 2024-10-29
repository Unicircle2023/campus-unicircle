import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import $ from "jquery";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export function AddToFaq() {
  const token = localStorage.getItem('Token');
  const [catDetails, updateCatDetails] = useState([]);
  const [categoryName, updateCategoryName] = useState("");
  const [question, updateQuestion] = useState("");
  const [answer, updateAnswer] = useState("");
  const [category, updateCategory] = useState("");
  const [keywords, updateKeywords] = useState("");
  const [error_message, updateError_message] = useState("");


  async function create_faqs() {

    try {
      const faqQuestion = document.getElementById("faqQuestion");
      const faqAnswer = document.getElementById("faq_Answer");
      const faqCategory = document.getElementById("faqCategory");
      const faqKeywords = document.getElementById("faqKeywords");

      if (faqQuestion.value == "" &&
        faqAnswer.value == "" &&
        faqCategory.value == "" &&
        faqKeywords.value == "") {
        $(".ValueMsg").show();

        setTimeout(function () {
          $(".ValueMsg").hide();
        }, 3000);
        return;
      }

      else if (faqQuestion.value == "") {

        $(".FaqQuestion").show();

        setTimeout(function () {
          $(".FaqQuestion").hide();
        }, 3000);

      }

      else if (faqAnswer.value == "") {

        $(".FaqAnswer").show();

        setTimeout(function () {
          $(".FaqAnswer").hide();
        }, 3000);

      }
      else if (faqKeywords.value == "") {

        $(".FaqKeywords").show();

        setTimeout(function () {
          $(".FaqKeywords").hide();
        }, 3000);

      }

      else{

        const formData = new FormData();

        formData.append("question", question);
        formData.append("answer", answer);
        formData.append("category", category);
        formData.append("keyword", keywords);

        const response = await axios.post(process.env.REACT_APP_API_KEY + "create_faqs",
          formData,
          {
            headers:
            {
              "Content-Type": 'multipart/form-data',

              "Authorization": token,
            }
          });

        console.log("Create Faq", response);

        updateError_message(response.data.message);
        updateQuestion("");
        updateAnswer("");
        updateCategory("");
        updateKeywords("");



        $(".formSuccess").show();

        setTimeout(function () {
          $(".formSuccess").hide();
        }, 5000);
      }
      
    }
    catch (err) {
      console.log("Log in Fail", err);

    }


  }

  async function fetchFaqCategory() {
    try {

      const fetchFaqCategoryResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_faq_categories",
        {
          headers:
          {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );

      console.log("Get FAQ Category", fetchFaqCategoryResponse.data.data);
      updateCatDetails(fetchFaqCategoryResponse.data.data);

    }
    catch (err) {
      console.log("Log in Fail", err);

    }

  }

  useEffect(() => {
    fetchFaqCategory();
  }, []);

  return (
    <div>
      {/* <div className="d-flex formSuccess">
        <img src={require('../images/correct.png')} style={{ width: "18px" }} />
        <p style={{ color: "green" }}>{error_message}</p>
      </div> */}


      <p style={{ color: "black", fontSize: "11PX", fontWeight: "600", marginTop: "10PX" }}>Question *</p>

      <input type="text"
        placeholder='Add a question...'
        id="faqQuestion"
        value={question}
        onChange={(e) => updateQuestion(e.target.value)}
        style={{
          height: "54px", border: "none", background: "#e4e9f3",
          fontWeight: "600", padding: "10px", margin: "7px 3px 0px 0px",
          color: "grey", fontSize: "8PX", width: "100%"
        }} />

      <div
        class="FaqQuestion"
        style={{ margin: "0", display: "none" }}
      >
        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
          Please Enter Question
        </h4>
      </div>

      <p style={{ color: "black", fontSize: "11PX", fontWeight: "600", marginTop: "10PX" }}>Answer *</p>

      <textarea
        id="faq_Answer"
        onChange={(e) => updateAnswer(e.target.value)}
        value={answer}
        style={{
          height: "300px", border: "none", background: "#e4e9f3",
          fontWeight: "600", padding: "10px", margin: "7px 3px 0px 0px", color: "grey",
          fontSize: "8PX", width: "100%"
        }} />

      <div
        class="FaqAnswer"
        style={{ margin: "0", display: "none" }}
      >
        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
          Please Enter Answer
        </h4>
      </div>

      <p style={{ color: "black", fontSize: "11PX", fontWeight: "600", marginTop: "10PX" }}>Category *</p>

      <select className="form-select form-select-sm " aria-label=".form-select-sm example"
        id="faqCategory"
        onChange={(e) => updateCategory(e.target.value)}
        style={{ width: "100%", padding: "5px", fontSize: "12px", color: "grey", border: "0.5px solid #c4c4c4", height: "33px", borderRadius: "0", marginTop: "3px" }}>
        <option selected="selected" value={category}>Select Category</option>
        {catDetails.map((catItem, index) => {
          console.log("Id", catItem.cat_id)
          return (
            <option value={catItem.cat_id}>
              {catItem.category_name}
            </option>
          );
        })}

      </select>
      <div
        class="FaqCategory"
        style={{ margin: "0", display: "none" }}
      >
        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
          Please Select Category
        </h4>
      </div>

      <p style={{ color: "black", fontSize: "11PX", fontWeight: "600", marginTop: "10PX" }}>Keywords *</p>

      <input type="text"
        placeholder='Enter keywords'
        id="faqKeywords"
        value={keywords}
        onChange={(e) => updateKeywords(e.target.value)}
        style={{
          height: "33px", border: "none", background: "#e4e9f3", fontWeight: "600",
          padding: "10px", margin: "7px 3px 0px 0px", color: "grey", fontSize: "8PX", width: "100%"
        }} />
        <div
        class="FaqKeywords"
        style={{ margin: "0", display: "none" }}
      >
        <h4 class="login-text" style={{ color: "red", fontSize: "12PX", marginLeft: "0" }}>
          Please Enter Keywords
        </h4>
      </div>


      <div className='d-flex mt-5'>
        {/* <button style={{background:"white",color:"#1f3977",borderRadius:"2px",fontSize:"14PX",padding:"7PX 15PX",border:"none",marginLeft:"AUTO",fontWeight:"600"}}>Cancel</button> */}

        {/* <button style={{
          background: "#1f3977", color: "white", borderRadius: "6px",
          fontSize: "14PX", padding: "12PX 35PX", border: "none",
          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)", fontWeight: "600", marginLeft: "AUTO"
        }}
          onClick={() => create_faqs()}>Publish</button> */}

        <input
          type="button"
          className="create_btn form-buttons3"
          defaultValue="Sign Up"
          value="Publish"
          onClick={() => create_faqs()}
          style={{
            background: "#1f3977", color: "white", borderRadius: "6px",
            fontSize: "14PX", padding: "12PX 35PX", border: "none",
            boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)", fontWeight: "600", marginLeft: "AUTO"
          }}
        />
      </div>
      <div class="formSuccess" style={{ marginTop: "5px", marginLeft: "14px", width: "94%", marginRight: "198px", display: "none" }}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success">
            {error_message}
          </Alert>
        </Stack>
      </div>

    </div>
  )
}
