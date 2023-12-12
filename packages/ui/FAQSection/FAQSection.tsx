import {
  FAQQuestion,
  SectionContentFAQ,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { useRef, useState } from "react";
import { Box, Card, Markdown, Stack, Text } from "..";
import * as Icon from "../icons";

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

export const Faq: React.FC<FAQProps> = ({
  qa,
  idx,
  onOpen,
  isOpen,
}: FAQProps) => {
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
    <Card>
      <div
        ref={ref}
        onClick={() => {
          onOpen(idx);
          ref.current?.scrollIntoView();
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

export const FAQSection: React.FC<FAQSectionProps> = ({
  content,
}: FAQSectionProps) => {
  const [openQA, setOpenQA] = useState<number | null>(null);

  return (
    <Box paddingX="none">
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
