import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { markdown } from "./markdown.css";

export const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown className={markdown} remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  );
};
