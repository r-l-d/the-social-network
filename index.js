const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bc");
const cookieSession = require("cookie-session");
module.exports = app;
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(compression());
app.use(express.static("./public"));
app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", async (req, res) => {
    const { first, last, email, password } = req.body;
    try {
        let hashedPass = await hash(password);
        let { rows } = await db.addUser(first, last, email, hashedPass);
        req.session.userId = rows[0].id;
        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let userInfo = await db.getPassword(email);
        let passCheck = await compare(password, userInfo.rows[0].password);
        if (passCheck) {
            req.session.userId = userInfo.rows[0].id;
            res.json({
                success: true
            });
        } else {
            res.json({
                success: false
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            success: false
        });
    }
});

app.get("/user.json", async (req, res) => {
    try {
        const { userId } = req.session;
        let { rows } = await db.getUser(userId);
        res.json(rows[0]);
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/user/:id", async (req, res) => {
    try {
        const loggedInUser = req.session.userId;
        const { id } = req.params;
        let { rows } = await db.getUser(id);
        res.json({
            rows: rows[0],
            id: id,
            loggedInUser: loggedInUser
        });
    } catch (err) {
        console.log(err);
    }
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const imageUrl = `${s3Url}${req.file.filename}`;
    const { userId } = req.session;
    db.addImage(imageUrl, userId)
        .then(() => {
            res.json({
                imgUrl: imageUrl
            });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/bio", async (req, res) => {
    try {
        const { userId } = req.session;
        const { bio } = req.body;
        await db.updateBio(bio, userId);
        res.json({
            bio: bio
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/logout", function(req, res) {
    req.session.userId = null;
    res.redirect("/welcome");
});

app.get("/api/users/:query", async (req, res) => {
    try {
        let { rows } = await db.getUsers(req.params.query);
        res.json(rows);
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/users", async (req, res) => {
    try {
        let { rows } = await db.newUsers();
        res.json(rows);
    } catch (err) {
        console.log(err);
    }
});

app.get("/friendshipstatus/:id", async (req, res) => {
    try {
        const sender_id = req.session.userId;
        const receiver_id = req.params.id;
        let { rows } = await db.getFriendship(receiver_id, sender_id);
        if (rows.length == 0) {
            res.json({
                buttonText: "Request Friend"
            });
        } else if (rows[0].accepted == true) {
            res.json({
                buttonText: "Unfriend"
            });
        } else if (rows[0].sender_id == sender_id) {
            res.json({
                buttonText: "Cancel Friend Request"
            });
        } else {
            res.json({
                buttonText: "Accept Friend Request"
            });
        }
    } catch (err) {
        console.log(err);
    }
});

app.post("/update-friendship/:id", async (req, res) => {
    try {
        const buttonText = req.body.buttonText;
        if (buttonText == "Request Friend") {
            const sender_id = req.session.userId;
            const receiver_id = req.params.id;
            await db.insertFriendship(receiver_id, sender_id);
            res.json({
                buttonText: "Cancel Friend Request"
            });
        } else if (buttonText == "Accept Friend Request") {
            const sender_id = req.params.id;
            const receiver_id = req.session.userId;
            await db.acceptFriendship(receiver_id, sender_id);
            res.json({
                buttonText: "Unfriend"
            });
        } else {
            const sender_id = req.session.userId;
            const receiver_id = req.params.id;
            await db.endFriendship(receiver_id, sender_id);
            res.json({
                buttonText: "Request Friend"
            });
        }
    } catch (err) {
        console.log(err);
    }
});

app.get("/friends-wannabes", async (req, res) => {
    try {
        const id = req.session.userId;
        let { rows } = await db.getFriendsAndWannabes(id);
        res.json(rows);
    } catch (err) {
        console.log(err);
    }
});

app.get("/other-friends/:id", async (req, res) => {
    try {
        const otherId = req.params.id;
        const id = req.session.userId;
        console.log("otherfriends in index.js. id: ", id);
        let friends = await db.getFriendship(otherId, id);
        console.log("friends: ", friends.rows);

        if (friends.rows.length == 0 || friends.rows[0].accepted == false) {
            res.json("");
        } else {
            let { rows } = await db.getFriendsAndWannabes(otherId);
            console.log("otherfriends in index.js. data: ", rows);
            res.json(rows);
        }
    } catch (err) {
        console.log(err);
    }
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

const onlineUsers = {};

io.on("connection", function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;
    console.log("userId: ", userId);

    onlineUsers[socket.id] = userId;
    // console.log("userId after socket.id: ", userId);
    console.log("onlineUsers: ", onlineUsers);

    socket.on("New Friend Request", request => {
        console.log("new friend request in index.js for id: ", request);
        for (const socketId in onlineUsers) {
            console.log("id is: ", onlineUsers[socketId]);
            if (onlineUsers[socketId] == request) {
                console.log("this user is online: ", onlineUsers[socketId]);
                io.to(socketId).emit("friendRequest", true);
            }
        }
    });

    socket.on("disconnect", function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
        delete onlineUsers[socket.id];
    });

    //make a db query to get last 10 chat chatMessages
    db.getLastTenChatMessages().then(data => {
        // console.log("last 10 chat messages: ", data.rows);
        io.sockets.emit("chatMessages", data.rows.reverse());
    });

    socket.on("New Message", msg => {
        // console.log("msg on server: ", msg);
        // console.log("userId: ", userId);
        let newMsg = {
            message: msg,
            id: userId
        };
        db.addMessage(msg, userId)
            .then(({ rows }) => {
                // console.log("data back from new msg: ", rows);
                newMsg.msg_id = rows[0].id;
                newMsg.created_at = rows[0].created_at;
                db.getUser(userId)
                    .then(({ rows }) => {
                        // console.log("rows from getuser: ", rows);
                        newMsg.first = rows[0].first;
                        newMsg.last = rows[0].last;
                        newMsg.image_url = rows[0].image_url;
                        // console.log("newMsg: ", newMsg);
                        io.sockets.emit("chatMessage", newMsg);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    });
});
