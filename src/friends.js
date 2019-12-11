import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend
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
import Button from "@material-ui/core/Button";

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

export default function Friends() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const friends = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(friends => friends.accepted == true)
        );
    });
    const wannabes = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(friend => friend.accepted == false)
        );
    });
    console.log("wannabes: ", wannabes);

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <div>
            <Container maxWidth="lg">
                {!!wannabes.length && (
                    <div>
                        <Typography className={classes.typography} variant="h4">
                            Friend Requests ({wannabes.length})
                        </Typography>
                        <Box display="flex" flexWrap="wrap">
                            {wannabes.map(wannabe => (
                                <Card key={wannabe.id} className={classes.card}>
                                    <CardActionArea>
                                        <Link to={`/user/${wannabe.id}`}>
                                            <CardMedia
                                                component="img"
                                                className={classes.media}
                                                image={wannabe.image_url}
                                            />
                                        </Link>
                                    </CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5">
                                            {wannabe.first} {wannabe.last}
                                        </Typography>
                                    </CardContent>

                                    <CardActions className={classes.buttonBox}>
                                        <Button
                                            size="small"
                                            onClick={e =>
                                                dispatch(unfriend(wannabe.id))
                                            }
                                        >
                                            Deny
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={e =>
                                                dispatch(
                                                    acceptFriendRequest(
                                                        wannabe.id
                                                    )
                                                )
                                            }
                                        >
                                            Accept
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    </div>
                )}

                <div>
                    <Typography className={classes.typography} variant="h4">
                        Friends ({friends.length})
                    </Typography>
                    <Box display="flex" flexWrap="wrap">
                        {friends.map(friend => (
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
                                    <Button
                                        size="small"
                                        onClick={e =>
                                            dispatch(unfriend(friend.id))
                                        }
                                    >
                                        Unfriend
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </div>
            </Container>
        </div>
    );
}
