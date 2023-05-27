import * as React from "react";

export const Header = ({ text }: { text: string }) => {
  return (
    <header className="hero bg-base-100">
      <h1 className="hero-content text-7xl">{text}</h1>
    </header>
  );
};
