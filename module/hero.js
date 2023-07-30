"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import "@css/hero.css";

const Typewriter = ({ text, speed }) => {
  const h2Ref = useRef(null);
  let index = 0;

  const type = () => {
    if (h2Ref.current && index < text.length) {
      const currentChar = text.charAt(index);
      if (currentChar === "<") {
        const nextTagEnd = text.indexOf(">", index + 1);
        h2Ref.current.innerHTML += text.substring(index, nextTagEnd + 1);
        index = nextTagEnd + 1;
      } else if (currentChar === "\n") {
        h2Ref.current.innerHTML += "<br>";
        index++;
      } else {
        h2Ref.current.innerHTML += currentChar === " " ? "&nbsp;" : currentChar;
        index++;
      }
      setTimeout(type, speed); // Adjust the typing speed (milliseconds per character)
    }
  };

  useEffect(() => {
    h2Ref.current.innerHTML = "";
    type();
  }, []);

  return <h2 ref={h2Ref} />;
};

function Hero() {
  const text = "Embark on<br>the New Age of<br>Space Exploration.";
  return (
    <>
      <div className="hero">
        <img className="background-img" src="/bg-img.jpg" />
        <Typewriter text={text} speed={70} />
        <Link href="/upcoming">
          <button>UPCOMING LAUNCH</button>
        </Link>
      </div>
    </>
  );
}

export default Hero;
