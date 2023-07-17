export const Pill = ({ children }: { children: React.ReactNode }) => {
  return (
    <span
      style={{
        display: "inline-flex",
        backgroundColor: "black",
        margin: "0.2em",
        padding: "0.5em",
        lineHeight: 0.7,
        borderRadius: 16,
      }}
    >
      {children}
    </span>
  );
};
