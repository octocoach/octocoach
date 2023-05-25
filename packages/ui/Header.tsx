import * as React from "react";

export const Header = ({ text }: { text: string }) => {
  return (
    <nav className="navbar bg-base-100">
      <a className="btn-ghost btn text-xl normal-case">{text}</a>
    </nav>
  );
};
