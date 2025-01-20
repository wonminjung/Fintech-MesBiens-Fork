import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./route/router";
import { AuthProvider } from "./lib/AuthContext";
import { store } from "./modules/store/store";

const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
};

export default App;
