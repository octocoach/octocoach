import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { tagline } from "./tagline.css";

export const Tagline = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown className={tagline} remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  );
};
