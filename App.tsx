import React from "react";
import { store } from "@shared-state";
import { Provider } from "react-redux";
import { AppContextProvider } from "@shared-state";
import { HomeNavigation } from "@presentation";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <HomeNavigation />
      </AppContextProvider>
    </Provider>
  );
};

export default App;
