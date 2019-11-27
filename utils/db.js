var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.addUser = function addUser(
    first,
    last,
    email,
    password,
    image_url,
    bio
) {
    return db.query(
        "INSERT INTO users(first, last, email, password, image_url, bio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [first, last, email, password, image_url, bio]
    );
};

exports.getPassword = function getPassword(email) {
    return db.query("SELECT password, id FROM users WHERE email=$1", [email]);
};
