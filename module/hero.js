"use client";
// Hero page
import { useEffect, useRef } from "react";
import Link from "next/link";
import "@css/hero.css";
import Typewriter from "./utils/typewriter";
import Image from "next/image";

function Hero() {
  const text = "Embark on<br>the New Age of<br>Space Exploration.";
  return (
    <>
      <div className="hero">
        <Image
          className={`background-img`}
          src="/bg-img.jpg"
          layout="fill"
          objectFit="cover"
          priority
        />
        <Typewriter text={text} speed={70} />
        <Link href="/upcoming">
          <button>UPCOMING LAUNCH</button>
        </Link>
      </div>
    </>
  );
}

export default Hero;
