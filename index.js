const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bc");
const cookieSession = require("cookie-session");
module.exports = app;
const csurf = require("csurf");

app.use(compression());
app.use(express.static("./public"));
app.use(express.json());

app.use(
    cookieSession({
        secret: `SPICY food is the best`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

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
        let id = await db.addUser(first, last, email, hashedPass);
        req.session.userId = id;
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

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
