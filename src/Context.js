import React, { useContext, useState } from "react";

const AppContext = React.createContext();
const getLocalStorage = (keyItem) => {
	let list = localStorage.getItem(keyItem);
	if (list) {
		return JSON.parse(localStorage.getItem(keyItem));
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
	const [list, setList] = useState(getLocalStorage("list"));
	const [user, setUser] = useState({});
	const [successInfo, setSuccessInfo] = useState({ flag: false, msg: "" });
	const [visible, setVisible] = useState(false);

	return (
		<AppContext.Provider
			value={{
				user,
				login,
				list,
				visible,
				formErrors,
				isSubmit,
				userLogin,
				successInfo,
				setUser,
				setList,
				setLogin,
				setVisible,
				setIsSubmit,
				setFormErrors,
				setUserLogin,
				getLocalStorage,
				setSuccessInfo,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
