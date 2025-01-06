import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./route/router";
import { AuthProvider } from "./lib/AuthContext";

const App: React.FunctionComponent = (): JSX.Element => {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
