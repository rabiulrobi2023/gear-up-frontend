export const getInitial = (fullName: string) => {
  const nameParts = fullName?.trim().split(/\s+/);
  if (nameParts?.length === 0) {
    return "";
  }
  if (nameParts?.length === 1) {
    return nameParts?.[0]?.[0]?.toUpperCase();
  }
  const result = `${nameParts?.[0]?.[0] + nameParts?.[1]?.[0]}`?.toUpperCase();
  return result;
};
