import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Avatar, Grid, Box } from "@material-ui/core";
import bg from "../assets/images/bg.jpg";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
import { useGlobalContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appStyles: { padding: "0% 15%" },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nameStyles: {},
  typography: {
    padding: theme.spacing(2),
  },
}));

const Home = (props) => {
  const { setUser } = useGlobalContext();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();
  const { email, password } = props.user[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.appStyles}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <h4
              style={{
                margin: "0 10px",
                textTransform: "capitalize",
                fontWeight: "400",
                fontSize: "1.2rem",
              }}
            >
              {email.slice(0, email.indexOf("@"))}
            </h4>
            <Tooltip title="Logout">
              <Avatar onClick={handleClick}></Avatar>
            </Tooltip>
          </Grid>
        </Toolbar>
      </AppBar>
      <img
        src={bg}
        alt="bg"
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          margin: "0",
          clipPath:
            "polygon(10% 50%, 25% 10%, 75% 10%, 90% 50%, 75% 80%,25% 80%)",
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography
          className={classes.typography}
          onClick={() => setUser({})}
          style={{ cursor: "pointer" }}
        >
          Logout
        </Typography>
      </Popover>
    </div>
  );
};

export default Home;
