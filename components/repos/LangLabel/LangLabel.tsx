interface LangLabelProps {
  color: string | null;
  name: string;
}

const LangLabel = ({ color, name }: LangLabelProps) => {
  return (
    <span
      style={{
        backgroundColor: color || "transparent",
        borderRadius: "2px",
        color: "white",
        padding: "2px 4px",
        marginRight: "4px",
      }}
      className={"inline-block rounded text-sm font-medium p-1"}
    >
      {name}
    </span>
  );
};

export default LangLabel;
