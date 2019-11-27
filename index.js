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

app.post("/register", function(req, res) {
    hash(req.body.password)
        .then(hashedPass => {
            const { first, last, email } = req.body;
            db.addUser(first, last, email, hashedPass)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.json({
                        success: true
                    });
                })
                .catch(err => {
                    console.log("error: ", err);
                    res.json({
                        success: false
                    });
                });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.getPassword(email)
        .then(({ rows }) => {
            const hashPass = rows[0].password;
            const userId = rows[0].id;
            compare(password, hashPass)
                .then(passCheck => {
                    if (passCheck) {
                        req.session.userId = userId;
                        res.json({
                            success: true
                        });
                    } else {
                        res.json({
                            success: false
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
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
