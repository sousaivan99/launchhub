// The code defines a React component called Typewriter that creates a typewriter effect.
// It takes two props: text for the text to animate, and speed for the animation speed.
// The text appears as if it's being typed on the screen. The component uses the useRef
// and useEffect hooks to achieve the effect.

import React, { useRef, useEffect } from "react";

const Typewriter = ({ text, speed }) => {
  const h2Ref = useRef(null);
  let index = 0;

  const type = () => {
    if (index < text.length) {
      const currentChar = text.charAt(index);
      if (currentChar === "<") {
        const nextTagEnd = text.indexOf(">", index + 1);
        h2Ref.current &&
          (h2Ref.current.innerHTML += text.substring(index, nextTagEnd + 1));
        index = nextTagEnd + 1;
      } else if (currentChar === "\n") {
        h2Ref.current && (h2Ref.current.innerHTML += "<br>");
        index++;
      } else {
        h2Ref.current &&
          (h2Ref.current.innerHTML +=
            currentChar === " " ? "&nbsp;" : currentChar);
        index++;
      }
      setTimeout(type, speed);
    }
  };

  useEffect(() => {
    h2Ref.current && (h2Ref.current.innerHTML = "");
    type();
  }, []);

  return <h2 ref={h2Ref} />;
};

export default Typewriter;
