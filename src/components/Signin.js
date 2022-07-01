import React from "react";
import Link from "@material-ui/core/Link";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Alert from "@material-ui/lab/Alert";

import {
	Avatar,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PersonIcon from "@material-ui/icons/Person";

import Home from "./Home";
import { useGlobalContext } from "../Context";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		margin: "0px 0px 20px 0px",
	},
	paper: {
		padding: "80px 40px 30px 40px",
		width: "300px",
		margin: "0 1rem",
		height: "min-content",
		borderRadius: "30px",
		position: "relative",
	},
	headerStyle: {
		margin: "0px",
		fontSize: "2rem",
		color: "#757575",
		fontWeight: "400",
	},
	loginStyles: {
		color: "#ffffff",
		fontSize: "1rem",
		borderRadius: "25px",
		padding: "10px 25px",
		marginTop: "1rem",
		textTransform: "capitalize",
		background: "#01C3FF",
		transition: "all 0.5s linear",
		"&:hover": {
			background: "#2196f3",
		},
	},
	visibleStyles: {
		color: "#919191 !important",
		fontSize: "1.2rem",
		cursor: "pointer",

		"&:hover": {
			color: "#656565 !important",
		},
	},
	avatarStyles: {
		background: "#01C3FF",
		width: "110px",
		height: "110px",
		position: "absolute",
		top: "-45px",
		left: "0px",
		right: "0px",
		marginLeft: "auto",
		marginRight: "auto",
	},

	formStyles: {
		marginTop: "1rem",
	},
	mainStyles: {
		height: "100vh",
		background: "#01C3FF",
		display: "flex",
		alignItems: "center",
		display: "flex",
		justifyContent: "center",
	},
	person: {
		fontSize: "80px",
	},
	gridStyles: {
		display: "flex",
		flexDirection: "column",
		gap: "2rem",
	},
	textfield: {
		marginBottom: "15px",
	},
}));
const Signin = () => {
	const {
		userLogin,
		setUserLogin,
		formErrors,
		setFormErrors,
		setIsSubmit,
		list,
		user,
		setUser,
		visible,
		setVisible,
	} = useGlobalContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmit(true);

		setFormErrors(validate(userLogin));
	};

	const validate = (userLogin) => {
		/* FLAG TO KNOW THE ERRORS STATUS */
		let flag = false;

		/* HOLD THE ERROS MESSAGES */
		const errors = {};

		/* REGEX FOR EMAIL VALIDATION */

		const emailregex =
			// eslint-disable-next-line
			/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (!userLogin.email) {
			errors.email = "Email is Required!";
			flag = true;
		} else if (!emailregex.test(userLogin.email)) {
			errors.email = "Enter the valid email!";
			flag = true;
		}
		if (!userLogin.password) {
			errors.password = "Password is Required!";
			flag = true;
		}
		/* COMPARING USER INPUTS WITH THE LOCALSTORAGE */
		if (flag === false) {
			const loginID = list.filter((item) => {
				return (
					item.email === userLogin.email && item.password === userLogin.password
				);
			});

			if (loginID.length === 0) {
				errors.notRegistered = "You are not registered!";
			} else {
				/* IF EXITS  SAVE THE DETAILS AND NAVIGATE TO HOME */
				setUser(loginID);
				setUserLogin({
					email: userLogin.email,
					password: "",
				});
			}
		}
		return errors;
	};
	const classes = useStyles();
	/* NAVIGATION TO HOME WHEN USER EXISTS */
	if (user.length > 0) {
		return (
			<>
				<Home user={user} />
			</>
		);
	} else {
		return (
			<Grid className={classes.mainStyles} container spacing={0}>
				<Paper elevation={20} className={classes.paper}>
					<Avatar className={classes.avatarStyles}>
						<PersonIcon className={classes.person} />
					</Avatar>
					<Grid align='center' className={classes.gridStyles}>
						<h2 className={classes.headerStyle}>LOGIN</h2>
						{/* ERROR MESSAGES */}
						{formErrors.notRegistered && (
							<div className={classes.root}>
								<Alert severity='error'>{formErrors.notRegistered}</Alert>
							</div>
						)}
						<form onSubmit={handleSubmit}>
							<TextField
								fullWidth
								label='Email'
								placeholder='Enter Your Email'
								variant='outlined'
								className={classes.textfield}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<EmailIcon
												className={classes.visibleStyles}
												style={{ color: "#616161" }}
											/>
										</InputAdornment>
									),
								}}
								value={userLogin.email}
								onChange={(e) =>
									setUserLogin({ ...userLogin, email: e.target.value })
								}
							/>
							{/* ERROR MESSAGES */}
							{formErrors.email && (
								<div className={classes.root}>
									<Alert severity='error'>{formErrors.email}</Alert>
								</div>
							)}

							<TextField
								fullWidth
								label='Password'
								placeholder='Create Your Password'
								variant='outlined'
								type={visible ? "text" : "password"}
								className={classes.textfield}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<LockIcon
												className={classes.visibleStyles}
												style={{ color: "#616161" }}
											/>
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position='end'>
											<VisibilityIcon
												className={classes.visibleStyles}
												style={{ color: "#616161" }}
												onClick={() => setVisible(!visible)}
											/>
										</InputAdornment>
									),
								}}
								value={userLogin.password}
								onChange={(e) =>
									setUserLogin({ ...userLogin, password: e.target.value })
								}
							/>
							{formErrors.password && (
								<div className={classes.root}>
									<Alert severity='error'>{formErrors.password}</Alert>
								</div>
							)}

							<Button
								className={classes.loginStyles}
								type='submit'
								variant='contained'>
								LOGIN
							</Button>
							<Typography variant='body2' style={{ lineHeight: "3rem" }}>
								Not Registered yet? <Link href='/signup'>Register</Link>
							</Typography>
						</form>
					</Grid>
				</Paper>
			</Grid>
		);
	}
};

export default Signin;
