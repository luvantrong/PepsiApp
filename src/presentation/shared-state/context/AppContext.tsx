import React, { createContext, useState } from "react";
import { firebaseConfig } from "@core";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { User } from "@domain";

interface AppContextProps {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  dataUser: User;
  setDataUser: React.Dispatch<React.SetStateAction<User>>;
}

type AppContextProviderProps = {
  children: React.ReactNode;
};

const defaultContextValue: AppContextProps = {
  isLoggedIn: false,
  setLoggedIn: () => {},
  dataUser: {} as User,
  setDataUser: () => {},
};

export const AppContext = createContext<AppContextProps>(defaultContextValue);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [dataUser, setDataUser] = useState<User>({} as User);

  const appContextValue: AppContextProps = {
    isLoggedIn,
    setLoggedIn,
    dataUser,
    setDataUser,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
