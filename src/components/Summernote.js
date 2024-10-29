import React, { useEffect, useRef } from 'react';


const Summernote = () => {
    const editorRef = useRef(null);

  useEffect(() => {
    
    const $editor = window.$(editorRef.current);
    $editor.summernote();
    return () => {
      $editor.summernote('destroy');
    };
  }, []);

  return <textarea ref={editorRef}/>;
};

export default Summernote;
