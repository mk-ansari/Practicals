import React, { useContext } from "react";
import { Snackbar, Alert } from '@mui/material'
import { SnackbarContext } from "../../Context/SnackbarContext";

export default function SimpleSnackbar() {
  const { snackbar, setSnackbar } = useContext(SnackbarContext);
  console.log("snackbar value", snackbar);

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setSnackbar("");
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar("");
  };

  const { message, type } = snackbar;

  
  return (
    <div>
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleClose}
          // severity={status.type}
          severity={type}
          sx={{ width: "100%" }}
        >
          {message}
          {/* {status.message} */}
        </Alert>
      </Snackbar>
      {/* <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={!!message}
        autoHideDuration={3000}
        onClose={handleClose}
        severity={type}
        message={message ? <span>{message}</span> : null}
        action={[
          <IconButton key="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      /> */}
    </div>
  );
}
