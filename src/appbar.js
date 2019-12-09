import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ProfilePic from "./profile-pic";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    avatar: {
        width: 60,
        height: 60,
        marginLeft: 30
    },
    link: {
        underline: "none",
        margin: 15
    },
    menu: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    }
}));

export default function MenuAppBar(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = event => {
        setAuth(event.target.checked);
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // console.log("props in appbar: ", props);
    // console.log("auth", props.auth);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        <Link color="inherit" underline="none" href="/">
                            The Social Network
                        </Link>
                    </Typography>
                    {props.auth && (
                        <div>
                            <div className={classes.menu}>
                                <Typography
                                    className={classes.link}
                                    variant="h6"
                                >
                                    <Link
                                        color="inherit"
                                        underline="none"
                                        href="/friends"
                                    >
                                        Friends
                                    </Link>
                                </Typography>
                                <Typography variant="h6">
                                    <Link
                                        color="inherit"
                                        underline="none"
                                        href="/users"
                                    >
                                        Users
                                    </Link>
                                </Typography>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Avatar
                                        src={props.imgUrl}
                                        alt={props.first + " " + props.last}
                                    />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem>
                                        <Link
                                            color="inherit"
                                            underline="none"
                                            href="/"
                                        >
                                            Profile
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <a href="/logout">Log Out</a>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
