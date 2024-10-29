import React from "react";
import ReactSummernote from "react-summernote";
// import 'react-summernote/dist/react-summernote.css';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
// import 'bootstrap/dist/css/bootstrap.css';
import './SummerNote.css';

export default function SummerNote({ options, _onChange,value}) {
  let newOptions = options || {
    lang: "ru-RU",
    // height: 70,
    dialogsInBody: true,
    toolbar: [
      ["font", ["bold", "underline", "clear"]],
      ["fontname", ["fontname"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["view", ["fullscreen"]],
    ],
  };
  let newValue = value || ""
  return (
    <ReactSummernote
      options={newOptions}
      onChange={_onChange ? _onChange : () => {}}
      value={newValue}
    />
  );
}
