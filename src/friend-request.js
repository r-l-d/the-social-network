import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5)
    }
}));

export default function FriendRequest() {
    const newRequest = useSelector(state => state && state.newRequest);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        console.log("newRequest is here", newRequest);
        setOpen(newRequest);
    }, [newRequest]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                message={<span id="message-id">New Friend Request</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </div>
    );
}
