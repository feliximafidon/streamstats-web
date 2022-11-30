import React from "react";

export const AppContext = React.createContext({
  alert: null,
  setAlert: () => {},
});
  