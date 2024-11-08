export const getInitials = (input: string) => {
  return input
    .split(' ')
    .map((word) => word.charAt(0))
    .join('');
};
