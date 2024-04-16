"use client";

import {
  FAQQuestion,
  SectionContentFAQ,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Box, Card, Markdown, Stack, Text } from "@octocoach/ui";
import { CaretDown, CaretUp } from "@octocoach/ui/icons";
import { useRef, useState } from "react";

export const faqSectionId: SectionId = "faq";

export type FaqSectionContent = SectionContentFAQ;

export interface FAQSectionProps {
  content: FaqSectionContent;
}

type FAQProps = {
  qa: FAQQuestion;
  idx: number;
  onOpen: (i: number) => void;
  isOpen: boolean;
};

export const Faq = ({ qa, idx, onOpen, isOpen }: FAQProps) => {
  const getButton = () => {
    return (
      <Box paddingX="extraSmall" paddingY="small">
        {isOpen ? <CaretUp size={16} /> : <CaretDown size={16} />}
      </Box>
    );
  };

  const getAnswer = () => {
    return (
      <div
        style={{
          maxHeight: isOpen ? 10000 : 0,
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
    <div
      ref={ref}
      tabIndex={10 + idx}
      onKeyDown={(ev) => {
        if (["Space", "Enter"].includes(ev.code)) {
          onOpen(idx);
          ref.current?.scrollIntoView();
        }
      }}
      role="button"
      onClick={() => {
        onOpen(idx);
        ref.current?.scrollIntoView();
      }}
      style={{
        cursor: "pointer",
      }}
    >
      <Card>
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
        {getAnswer()}
      </Card>
    </div>
  );
};

export const FAQSection = ({ content }: FAQSectionProps) => {
  const [openQA, setOpenQA] = useState<number | null>(null);

  return (
    <Box paddingY="medium">
      <Text element="h2" size="l" weight="bold">
        FAQs
      </Text>
      <Stack>
        {content.questions?.map((qa, idx) => (
          <Faq
            key={idx}
            qa={qa}
            idx={idx}
            onOpen={(i) => {
              if (openQA === idx) {
                setOpenQA(null);
              } else {
                setOpenQA(i);
              }
            }}
            isOpen={idx === openQA}
          />
        ))}
      </Stack>
    </Box>
  );
};
