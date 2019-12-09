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
        maxWidth: 200,
        margin: 10
    },
    media: {
        height: 140
    },
    typography: {
        margin: 10
    },
    buttonBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
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
                            Wannabes
                        </Typography>
                        <Box display="flex" flexWrap="wrap">
                            {wannabes.map(wannabe => (
                                <Card key={wannabe.id} className={classes.card}>
                                    <CardActionArea>
                                        <Link to={`/user/${wannabe.id}`}>
                                            <CardMedia
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
                                    <Container>
                                        <Box
                                            alignItems="flex-end"
                                            className={classes.buttonBox}
                                        >
                                            <CardActions>
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
                                                    Accept Friend Request
                                                </Button>
                                                <Button
                                                    size="small"
                                                    onClick={e =>
                                                        dispatch(
                                                            unfriend(wannabe.id)
                                                        )
                                                    }
                                                >
                                                    Deny Friend Request
                                                </Button>
                                            </CardActions>
                                        </Box>
                                    </Container>
                                </Card>
                            ))}
                        </Box>
                    </div>
                )}

                <div>
                    <Typography className={classes.typography} variant="h4">
                        Friends
                    </Typography>
                    <Box display="flex" flexWrap="wrap">
                        {friends.map(friend => (
                            <Card key={friend.id} className={classes.card}>
                                <CardActionArea>
                                    <Link to={`/user/${friend.id}`}>
                                        <CardMedia
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
                                <CardActions>
                                    <Box className={classes.buttonBox}>
                                        <Button
                                            size="small"
                                            onClick={e =>
                                                dispatch(unfriend(friend.id))
                                            }
                                        >
                                            Unfriend
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </div>
            </Container>
        </div>
    );
}
