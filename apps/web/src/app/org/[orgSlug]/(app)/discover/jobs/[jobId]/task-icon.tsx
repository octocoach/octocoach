"use client";

import { vars } from "@octocoach/ui";
import {
  CircleDash,
  HelpFilled,
  ThumbsDown,
  ThumbsUp,
} from "@octocoach/ui/icons";

export const TaskIcon = ({ interest }: { interest: number }) => {
  const getIcon = (interest: number) => {
    if (interest > 0)
      return <ThumbsUp color={vars.color.typography.success} size={32} />;
    if (interest < 0)
      return <ThumbsDown color={vars.color.typography.error} size={32} />;
    if (interest === 0)
      return <HelpFilled color={vars.color.typography.warning} size={32} />;
    return <CircleDash color={vars.color.typography.warning} size={32} />;
  };

  return <div style={{ width: 32, height: 32 }}>{getIcon(interest)}</div>;
};
