import React from "react";
import { Toaster, toast } from "sonner";

const GpToast = ({ message }) => {

  React.useEffect(() => {
    toast(message);
  });

  return (
    <>
      <Toaster richColors />
    </>
  );
};

export default GpToast;
