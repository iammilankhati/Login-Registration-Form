import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { useGlobalContext } from "../Context";
import Alert from "@material-ui/lab/Alert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		margin: "0px 0px 20px 0px",
	},
	visibleStyles: {
		color: "#919191 !important",
		fontSize: "1.2rem",
		cursor: "pointer",

		"&:hover": {
			color: "#656565 !important",
		},
	},
	paper: {
		padding: "40px 40px 30px 40px",
		width: "300px",
		justifyContent: "center",
		alignItems: "center",
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
	avatarStyles: {
		background: "#e0e0e0",
		width: "110px",
		height: "110px",
		position: "absolute",
		top: "-45px",
		left: "0px",
		right: "0px",
		marginLeft: "auto",
		marginRight: "auto",
		boxShadow: "0px 5px 60px 0px grey;",
	},

	formStyles: {
		marginTop: "1rem",
	},
	mainStyles: {
		height: "100vh",
		background: "#01C3FF",
		alignItems: "center",
		display: "flex",
		justifyContent: "center",
	},
	person: {
		fontSize: "80px",
	},
	gridStyles: {
		// border: "1px solid red",
		display: "flex",
		flexDirection: "column",
		gap: "2rem",
	},
	textfield: {
		marginBottom: "15px",
		color: "green",
	},
}));
const Signin = () => {
	let flag = false;
	const errors = {};
	const [visible, setVisible] = useState(false);
	const {
		login,
		setLogin,
		list,
		setList,
		formErrors,
		setFormErrors,
		isSubmit,
		setIsSubmit,
		successInfo,
		setSuccessInfo,
	} = useGlobalContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmit(true);
		setFormErrors(validate(login));
	};
	const validate = (login) => {
		/* REGEX TO AUTHENTICATE THE USER EMAIL AND PASSWORD */

		const emailregex =
			// eslint-disable-next-line
			/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		const passwordregex =
			/^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

		/* VALIDATION FOR EMAIL */
		if (!login.email) {
			errors.email = "Email is Required!";
			flag = true;
		} else if (!emailregex.test(login.email)) {
			errors.email = "Enter the valid email!";
			flag = true;
		}
		/* VALIDATION FOR PASSWORD */
		if (!login.password) {
			errors.password = "Password is Required!";
			flag = true;
		}
		if (!passwordregex.test(login.password)) {
			errors.unmatched =
				"Password must include at least 7 digits, a special character and a number";
			flag = true;
		} else if (login.password !== login.confirmPassword) {
			errors.unmatched = "Paswords needs to be matched!";
			flag = true;
		}
		/* VALIDATION FOR DUPLICATE EMAIL */
		const matchedID = list.filter((item) => item.email === login.email);
		if (matchedID.length > 0) {
			errors.matched = "This email is already registered!";
			flag = true;
		}

		/* IF ALL CORRECT THEN SAVE INPUTS TO LIST */
		if (flag === false) {
			const newItem = { id: new Date().getTime().toString(), ...login };
			setList([...list, newItem]);
			setLogin({ email: login.email, password: "", confirmPassword: "" });
			setSuccessInfo({
				flag: true,
				msg: "You are successfully registered!",
			});
		}

		return errors;
	};

	/* USING THE LOCALSTORAGE TO STORE THE USERINPUTS THROUGH LIST */
	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			localStorage.setItem("list", JSON.stringify(list));
		}
	}, [formErrors, isSubmit, list]);

	const classes = useStyles();
	return (
		<Grid container className={classes.mainStyles} sx={{ ml: 2 }}>
			<Paper elevation={20} className={classes.paper}>
				<Grid align='center' className={classes.gridStyles}>
					<h2 className={classes.headerStyle}>SIGN UP</h2>

					{successInfo.flag && (
						<div className={classes.root} style={{ margin: "0" }}>
							<Alert severity='success'>{successInfo.msg}</Alert>
						</div>
					)}
					{formErrors.matched && (
						<div className={classes.root} style={{ margin: "0" }}>
							<Alert severity='error'>{formErrors.matched}</Alert>
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
							value={login.email}
							onChange={(e) => setLogin({ ...login, email: e.target.value })}
						/>
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
							className={classes.textfield}
							type={visible ? "text" : "password"}
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
							value={login.password}
							onChange={(e) => setLogin({ ...login, password: e.target.value })}
						/>
						{formErrors.password && (
							<div className={classes.root}>
								<Alert severity='error'>{formErrors.password}</Alert>
							</div>
						)}

						<TextField
							fullWidth
							label='Confirm Password'
							placeholder='Re-type Password'
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
							value={login.confirmPassword}
							onChange={(e) =>
								setLogin({ ...login, confirmPassword: e.target.value })
							}
						/>
						{formErrors.unmatched && (
							<div className={classes.root}>
								<Alert severity='error'>{formErrors.unmatched}</Alert>
							</div>
						)}

						<Button
							className={classes.loginStyles}
							type='submit'
							variant='contained'>
							CREATE ACCOUNT
						</Button>
						<Typography variant='body2' style={{ lineHeight: "3rem" }}>
							Already have an account? <Link href='/signin'>Login</Link>
						</Typography>
					</form>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default Signin;
