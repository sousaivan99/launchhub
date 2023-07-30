"use client";
import About from "@module/about";
import Hero from "@module/hero";
import Team from "@module/team";
import React, { useState, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "LaunchHUB";
  }, []);
  return (
    <>
      <Hero />
      <About />
      <Team />
    </>
  );
}
