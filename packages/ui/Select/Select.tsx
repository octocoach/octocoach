import * as React from "react";
import * as Ariakit from "@ariakit/react";
import clsx from "clsx";
import { button } from "../Button/button.css";
import { selectButton, selectItem, selectPopover } from "./select.css";
import { Smell } from "@carbon/icons-react";

export interface SelectProps extends Ariakit.SelectProps {
  value?: string;
  displayValue?: string;
  setValue?: (value: string) => void;
  defaultValue?: string;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  sameWidth?: boolean;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      children,
      value,
      setValue,
      defaultValue,
      displayValue,
      sameWidth,
      ...props
    },
    ref
  ) => {
    const select = Ariakit.useSelectStore({
      value,
      setValue,
      defaultValue,
    });
    const portalRef = React.useRef<HTMLDivElement>(null);
    const selectValue = select.useState("value");

    // Only call onBlur if the focus is leaving the whole widget.
    const onBlur = (event: React.FocusEvent<HTMLElement>) => {
      const portal = portalRef.current;
      const { selectElement, popoverElement } = select.getState();
      if (portal?.contains(event.relatedTarget)) return;
      if (selectElement?.contains(event.relatedTarget)) return;
      if (popoverElement?.contains(event.relatedTarget)) return;
      props.onBlur?.(event);
    };

    return (
      <>
        <Ariakit.Select
          ref={ref}
          {...props}
          store={select}
          onBlur={onBlur}
          className={clsx(
            button({ color: "subtle" }),
            selectButton,
            props.className
          )}
        >
          {displayValue || selectValue || "Select an item"}
          <Ariakit.SelectArrow />
        </Ariakit.Select>
        <Ariakit.SelectPopover
          store={select}
          modal
          sameWidth={sameWidth}
          gutter={4}
          onBlur={onBlur}
          portalRef={portalRef}
          className={clsx(selectPopover)}
        >
          {children}
        </Ariakit.SelectPopover>
      </>
    );
  }
);

export interface SelectItemProps extends Ariakit.SelectItemProps {}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem(props, ref) {
    return (
      <Ariakit.SelectItem
        ref={ref}
        {...props}
        className={clsx(selectItem, props.className)}
      />
    );
  }
);
