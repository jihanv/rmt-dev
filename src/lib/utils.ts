import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
  let message = "An error occured";

  if (error instanceof Error) {
    message = error.message;
  }
  toast.error(message);
};
