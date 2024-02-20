export const getLocalTimezone = () => {
  if (!window) {
    throw new Error("This function should only be called in the browser");
  }
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Berlin";
};
