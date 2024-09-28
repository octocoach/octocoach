import { Launch } from "@carbon/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { markdown } from "./markdown.css";

export const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      className={markdown}
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => {
          if (!href) {
            throw new Error(`Missing href for Markdown Link`);
          }
          return (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{ textWrap: "nowrap" }}
            >
              {children}
              {href.startsWith("http") && (
                <Launch style={{ fontSize: "1em", display: "inline" }} />
              )}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
