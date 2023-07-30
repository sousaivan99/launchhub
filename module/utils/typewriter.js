import React, { useRef, useEffect } from "react";

const Typewriter = ({ text, speed }) => {
  const spanRef = useRef(null); // Change h2Ref to spanRef
  let index = 0;

  const type = () => {
    if (index < text.length) {
      const currentChar = text.charAt(index);
      if (currentChar === "<") {
        const nextTagEnd = text.indexOf(">", index + 1);
        spanRef.current.innerHTML += text.substring(index, nextTagEnd + 1);
        index = nextTagEnd + 1;
      } else if (currentChar === "\n") {
        spanRef.current.innerHTML += "<br>";
        index++;
      } else {
        spanRef.current.innerHTML +=
          currentChar === " " ? "&nbsp;" : currentChar;
        index++;
      }
      setTimeout(type, speed); // Adjust the typing speed (milliseconds per character)
    }
  };

  useEffect(() => {
    spanRef.current.innerHTML = ""; // Change h2Ref to spanRef
    type();
  }, []);

  return <span ref={spanRef} />; // Change h2 to span
};

export default Typewriter;
