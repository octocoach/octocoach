"use client";

export const Button = ({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) => {
  return <button onClick={onClick}>{children}</button>;
};
