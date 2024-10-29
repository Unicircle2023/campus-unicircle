import React,{useEffect, useState} from 'react'
import Faq from "react-faq-component";
import axios from "axios";
import $ from "jquery";

export function FaqContents() {
  var FaqItem=[];
  const token = localStorage.getItem('Token');
const[data, setData] = useState([]);

async function fetchList() {
  console.log("Access Token-",token);
  try{
    
      const fetchFaqResponse = await axios.get(process.env.REACT_APP_API_KEY + "get_categoriwise_faqs",
      {
        headers: 
      {
        "Content-Type": 'multipart/form-data',
      
        "Authorization": token,
      } 
      }
    );
   
      console.log("Get Faq List Details",fetchFaqResponse);

      const FaqErrorCode = fetchFaqResponse.data.error_code;
      console.log("Faq Error Code ", FaqErrorCode);

      const FaqErrorMsg = fetchFaqResponse.data.message;
      console.log("Badge Error msg ", FaqErrorMsg);



    if (FaqErrorCode == 200) {
        const faqListArray = fetchFaqResponse.data.data;
        console.log("Faq list Array", faqListArray);

        setData(faqListArray);
      }
      else {
        setData([]);

        console.log(fetchFaqResponse.data.message);
        $(".alert-danger").show();
        setTimeout(function () {
          $(".alert-danger").hide();
        }, 3000);
      }
    
  }
  catch(err)
  {
    console.log("Log in Fail",err);
   
  }
 
}

useEffect(() => {

  fetchList();
},[]);

const styles = {

  titleTextColor: "blue",
  rowTitleColor: "blue",
border:"1px solid red"
};


{data.map((itemFaq) =>
  {
    console.log("category_name",itemFaq.category_name);
    FaqItem.push(itemFaq.category_name);
  })}

  console.log("FaqItem",FaqItem)
  const data1 = {
    // title: FaqItem,
    rows: [
        {
            title: "Q1-What is the ranking of SIMS?",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
              Fusce sed commodo purus, at tempus turpis.`,
              action:"<"
              
        },
        {
            title: "Q2-Does SIMS encourage Entrepreneurship?",
            content:
                "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
        },
        {
            title: "Q3-When do you provide official leave?",
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: "Q4-What is the attendence criteria?",
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
          title: "Q5-Which specializations do you offer?",
          content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
          Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
          Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
          Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
      },
      {
        title: "Q6-When do students get to know their major specializations?",
        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
        Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
        Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
        Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
    },
    {
      title: "Q7-When is the specialization allotted to students and do they have any fixed number of seats?",
      content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
      Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
      Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
      Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
  },    
  {
    title: "Q8-What is the ratio of work ex and freshers?",
    content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
    Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
    Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
    Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
  },
  {
    title: "Q9-Which specialization is better and why?",
    content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
    Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
    Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
    Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
  },
  {
    title: "Q9-Are exchange programs available at SIMS?",
    content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
    Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
    Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
    Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
  },
  {
    title: "Q10-Is the first semister common for all specialization?",
    content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
    Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
    Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
    Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
  },
    ],
  };
    return (
      <div style={{border:"1px solid green"}}>
      <Faq
          data={data1}
          styles={styles}
          
          // config={config}
      />
   
  </div>
    )
}






