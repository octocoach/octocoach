import * as React from "react";

export const Header = ({ text }: { text: string }) => {
  return (
    <nav className="navbar bg-base-100">
      <a className="btn btn-ghost normal-case text-xl">{text}</a>
    </nav>
  );
};
