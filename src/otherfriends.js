import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
    getOtherFriends
} from "./actions";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Friendshipbutton from "./friendshipbutton";

const useStyles = makeStyles({
    card: {
        width: 200,
        margin: 10
    },
    media: {
        height: 150
    },
    typography: {
        margin: 10
    },
    buttonBox: {
        display: "flex",
        justifyContent: "flex-start"
        // alignItems: "flex-end"
    }
});

export default function OtherFriends(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const otherFriends = useSelector(state => {
        return state.otherFriends;
    });

    console.log("props in otherfriends: ", props);

    useEffect(() => {
        dispatch(getOtherFriends(props.otherId));
    }, []);

    if (!otherFriends) {
        return null;
    }

    console.log("otherfriends: ", otherFriends);

    return (
        <div>
            <Container maxWidth="lg">
                <div>
                    <Typography className={classes.typography} variant="h4">
                        Friends ({otherFriends.length})
                    </Typography>
                    <Box display="flex" flexWrap="wrap">
                        {otherFriends.map(friend => (
                            <Card key={friend.id} className={classes.card}>
                                <CardActionArea>
                                    <Link to={`/user/${friend.id}`}>
                                        <CardMedia
                                            component="img"
                                            className={classes.media}
                                            image={friend.image_url}
                                        />
                                    </Link>
                                </CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {friend.first} {friend.last}
                                    </Typography>
                                </CardContent>

                                <CardActions className={classes.buttonBox}>
                                    <Friendshipbutton
                                        otherId={friend.id}
                                        id={props.id}
                                    />
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </div>
            </Container>
        </div>
    );
}
