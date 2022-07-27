import hljs from "highlightjs";

interface CodeFragmentProps {
  fileContents: string;
  language: string;
  lineNumbers?: boolean;
  lineNumberStart?: number;
  lineNumberEnd?: number;
}

const CodeFragment = ({ fileContents, language }: CodeFragmentProps) => {
  const html = hljs.highlight(language, fileContents);
  return (
    <div>
      <pre>
        <code
          dangerouslySetInnerHTML={{ __html: html.value }}
          style={{ fontSize: 12 }}
        ></code>
      </pre>
    </div>
  );
};

export default CodeFragment;
