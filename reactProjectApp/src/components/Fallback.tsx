import { Typography } from "@mui/material";
import React from "react";

interface FallbackProps {
  error: Error;
}

const Fallback: React.FC<FallbackProps> = ({ error/** тут еще функцию ресета можно заюзать*/ }) => {
  return (
    <div role="alert">
      <Typography>Something went wrong:</Typography>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
};

export { Fallback };