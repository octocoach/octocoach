"use client";

import { Box, Card, Icon, Markdown, Stack, Text } from "@octocoach/ui";
import { useRef } from "react";

export interface QA {
  question: string;
  answer: string;
}

export const Faq = ({
  qa,
  idx,
  onOpen,
  isOpen,
}: {
  qa: QA;
  idx: number;
  onOpen: (i: number) => void;
  isOpen: boolean;
}) => {
  const getButton = () => {
    return (
      <Box paddingX="extraSmall" paddingY="small">
        {isOpen ? <Icon.CaretUp size={16} /> : <Icon.CaretDown size={16} />}
      </Box>
    );
  };

  const getAnswer = () => {
    return (
      <div
        style={{
          maxHeight: isOpen ? 1000 : 0,
          overflow: "hidden",
          transition: `max-height ease-in-out 0.5s`,
        }}
      >
        {<Markdown>{qa.answer}</Markdown>}
      </div>
    );
  };

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Card>
      <div
        ref={ref}
        onClick={() => {
          onOpen(idx);
          ref.current.scrollIntoView();
        }}
        style={{
          cursor: "pointer",
        }}
      >
        <Stack
          direction="horizontal"
          spacing="tight"
          align="center"
          justify="between"
        >
          <Text variation="casual" weight="heavy">
            {qa.question}
          </Text>
          {getButton()}
        </Stack>
      </div>
      {getAnswer()}
    </Card>
  );
};
