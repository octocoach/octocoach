"use client";

import * as React from "react";

export const Button = ({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) => {
  return (
    <button className="btn-secondary btn" onClick={onClick}>
      {children}
    </button>
  );
};
