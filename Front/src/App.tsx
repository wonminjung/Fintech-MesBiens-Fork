import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./route/router";
import { AuthProvider } from "./lib/AuthContext";
import ModalFunc from "./components/modal/utils/ModalFunc";

const App: React.FunctionComponent = (): JSX.Element => {

  

  // useEffect(() => {
  //   ModalFunc().closeModal();
  // }, [document.location]);
  
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
