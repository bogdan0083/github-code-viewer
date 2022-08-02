
interface CodeFragmentProps {
  fileContents: string;
  language: string;
  lineNumbers?: boolean;
  lineNumberStart?: number;
  lineNumberEnd?: number;
}

const CodeFragment = ({ fileContents, language }: CodeFragmentProps) => {
  return (
    <div>
      <pre>
        <code
          dangerouslySetInnerHTML={{ __html: fileContents }}
          style={{ fontSize: 12 }}
        ></code>
      </pre>
    </div>
  );
};

export default CodeFragment;
