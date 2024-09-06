import React from "react";
import { Img, staticFile } from "remotion";

import { BaLogo } from "./BALogo";
import { c } from "./helpers";

export const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 40,
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      <BaLogo width={300} />
      <Img src={staticFile("images/certqua_measure_l.png")} width={250} />
      <h1 style={{ fontSize: 60 }}>
        <a href="#" style={{ color: c("blue") }}>
          q15.co
        </a>
      </h1>
    </div>
  );
};
