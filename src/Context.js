import React, { useContext, useState } from "react";

const AppContext = React.createContext();
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
export const AppProvider = ({ children }) => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const userInitial = {
    email: "",
    password: "",
  };

  const [login, setLogin] = useState(initialValues);
  const [userLogin, setUserLogin] = useState(userInitial);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [list, setList] = useState(getLocalStorage);
  const [user, setUser] = useState({});
  const [successInfo, setSuccessInfo] = useState({ flag: false, msg: "" });

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        list,
        formErrors,
        isSubmit,
        userLogin,
        successInfo,
        setUser,
        setList,
        setLogin,
        setIsSubmit,
        setFormErrors,
        setUserLogin,
        getLocalStorage,
        setSuccessInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
