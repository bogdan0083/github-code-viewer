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
      <pre style={{ fontSize: 12 }}>
        {language ? (
          <code dangerouslySetInnerHTML={{ __html: fileContents }}></code>
        ) : (
          <code>{fileContents}</code>
        )}
      </pre>
    </div>
  );
};

export default CodeFragment;
