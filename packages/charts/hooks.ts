import debounce from "just-debounce-it";

import { useEffect, useState } from "react";

export const useParentWidth = (parentId: string) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const parent = document.getElementById(parentId);
    setWidth(parent?.clientWidth || 0);

    const resizeHandler = debounce(() => {
      if (parent) setWidth(parent.clientWidth);
    }, 500);

    window.addEventListener("resize", resizeHandler, true);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [parentId]);

  return width;
};
