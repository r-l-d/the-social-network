var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.addUser = function addUser(first, last, email, password) {
    return db.query(
        "INSERT INTO users(first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [first, last, email, password]
    );
};

exports.getPassword = function getPassword(email) {
    return db.query("SELECT password, id FROM users WHERE email=$1", [email]);
};

exports.getUser = function getUser(id) {
    return db.query(
        "SELECT first, last, image_url, bio FROM users WHERE id=$1",
        [id]
    );
};

exports.addImage = function addImage(url, id) {
    return db.query("UPDATE users SET image_url=$1  WHERE id=$2", [url, id]);
};

exports.updateBio = function updateBio(bio, id) {
    return db.query("UPDATE users SET bio=$1 WHERE id=$2", [bio, id]);
};

exports.getUsers = function getUsers(val) {
    return db.query(
        "SELECT first, last, id, bio, image_url FROM users WHERE first ILIKE $1 OR last ILIKE $1",
        [val + "%"]
    );
};

exports.newUsers = function newUsers() {
    return db.query(
        "SELECT first, last, id, bio, image_url FROM users ORDER BY id DESC LIMIT 3"
    );
};

exports.getFriendship = function getFriendship(receiver_id, sender_id) {
    return db.query(
        "SELECT * FROM friendships WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1)",
        [receiver_id, sender_id]
    );
};

exports.insertFriendship = function insertFriendship(receiver_id, sender_id) {
    return db.query(
        "INSERT INTO friendships(receiver_id, sender_id) VALUES($1, $2)",
        [receiver_id, sender_id]
    );
};

exports.acceptFriendship = function acceptFriendship(receiver_id, sender_id) {
    return db.query(
        "UPDATE friendships SET accepted='true' WHERE receiver_id=$1 AND sender_id=$2",
        [receiver_id, sender_id]
    );
};

exports.endFriendship = function endFriendship(receiver_id, sender_id) {
    return db.query(
        "DELETE FROM friendships WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1)",
        [receiver_id, sender_id]
    );
};

exports.getFriendsAndWannabes = function getFriendsAndWannabes(id) {
    return db.query(
        "SELECT users.id, first, last, image_url, accepted FROM friendships JOIN users ON (accepted = false AND receiver_id = $1 AND sender_id = users.id) OR (accepted = true AND receiver_id = $1 AND sender_id = users.id) OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)",
        [id]
    );
};

exports.getLastTenChatMessages = function getLastTenChatMessages() {
    return db.query(
        "SELECT chatroom.id AS msg_id, chatroom.message, chatroom.created_at, users.id, users.image_url, users.first, users.last FROM chatroom JOIN users ON (chatroom.user_id = users.id) ORDER BY chatroom.id DESC LIMIT 10  "
    );
};

exports.addMessage = function addMessage(message, user_id) {
    return db.query("INSERT INTO chatroom(message, user_id) VALUES($1, $2)", [
        message,
        user_id
    ]);
};
