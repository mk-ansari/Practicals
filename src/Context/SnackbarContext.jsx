import React, { createContext, useState } from 'react';

export const SnackbarContext = createContext({
  setSnackbar: () => {},
  snackbar: {},
});

export const SnackbarContainer = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: null,
  });

  const handleSnackbarSet = (message, type) => {
    setSnackbar({
      message,
      type,
    });
  };

  const contextValue = {
    setSnackbar: handleSnackbarSet,
    snackbar,
  };
  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
};

