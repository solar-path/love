export const generateResponse = ({
  data,
  success,
  message,
}: {
  data: any;
  success: boolean;
  message: string;
}) => {
  return {
    success,
    message,
    data,
  };
};
