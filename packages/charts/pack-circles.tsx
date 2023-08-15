"use client";

import {
  skillLevel,
  type SkillLevel,
} from "@octocoach/db/src/schema/users-skills-levels";
import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Card, Text, vars } from "@octocoach/ui";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { hierarchy, Pack } from "@visx/hierarchy";
import { LegendOrdinal } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";
import { Tooltip, useTooltip } from "@visx/tooltip";
import debounce from "just-debounce-it";
import { useEffect, useState } from "react";

export const PackCircles = ({
  container,
  data,
}: {
  container: string;
  data: { fill: SkillLevel; name: string }[];
}) => {
  const { LL } = useI18nContext();
  const [width, setWidth] = useState(0);

  const {
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
    showTooltip,
    hideTooltip,
  } = useTooltip<{ name: string }>();

  useEffect(() => {
    const parent = document.getElementById(container);
    setWidth(parent?.clientWidth || 0);

    const resizeHandler = debounce(() => {
      if (parent) setWidth(parent.clientWidth);
    }, 500);

    window.addEventListener("resize", resizeHandler, true);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const root = hierarchy({
    name: "root",
    fill: undefined,
    children: data,
  }).count();

  const colorScale = scaleOrdinal({
    domain: skillLevel.enumValues,
    range: [
      vars.color.accent.normal,
      vars.color.brand.normal,
      vars.color.typography.success,
      vars.color.typography.warning,
      vars.color.typography.error,
    ],
  });

  const sizeScale = scaleOrdinal({
    domain: skillLevel.enumValues,
    range: skillLevel.enumValues.map((_, i) => 0.5 + i * 0.12),
  });

  if (width < 300) return null;

  return (
    <div style={{ position: "relative", height: width }}>
      <svg width={width} height={width} style={{ position: "absolute" }}>
        <Pack size={[width, width]} root={root}>
          {(packData) => {
            const circles = packData.descendants();
            return (
              <Group>
                {circles.map((circle, i) => {
                  return (
                    <circle
                      key={`circle-${i}`}
                      r={
                        circle.data.fill
                          ? circle.r * sizeScale(circle.data.fill)
                          : 0
                      }
                      cx={circle.x}
                      cy={circle.y}
                      fill={
                        circle.data.fill
                          ? colorScale(circle.data.fill)
                          : "transparent"
                      }
                      onMouseEnter={(ev) => {
                        if (ev.currentTarget.parentElement) {
                          const coords = localPoint(
                            ev.currentTarget.parentElement,
                            ev
                          );
                          if (coords) {
                            showTooltip({
                              tooltipData: circle.data,
                              tooltipLeft: coords.x,
                              tooltipTop: coords.y,
                            });
                          }
                        }
                      }}
                      onMouseLeave={() => {
                        hideTooltip();
                      }}
                    />
                  );
                })}
              </Group>
            );
          }}
        </Pack>
      </svg>
      {tooltipOpen && tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={{ position: "absolute" }}
        >
          <Card>
            <Text>{tooltipData.name}</Text>
          </Card>
        </Tooltip>
      )}
      <LegendOrdinal
        scale={colorScale}
        style={{ position: "absolute" }}
        itemDirection="row"
        labelFormat={(id) => LL.skillLevels[id].title()}
        domain={skillLevel.enumValues}
      />
    </div>
  );
};
