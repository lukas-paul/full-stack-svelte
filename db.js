const spicedPg = require("spiced-pg");
const dbUsername = "postgres";
const dbPassword = "postgres";
const database = "bandmates";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUsername}:${dbPassword}@localhost:5432/${database}`
);

module.exports.getPosts = () => {
    return db.query(`SELECT * FROM posts ORDER BY id DESC LIMIT 10`);
};

module.exports.choosePost = (id) => {
    let params = [id];
    return db.query(`SELECT * FROM posts WHERE id=$1`, params);
};

module.exports.newPost = (name, city, title, text) => {
    let params = [name, city, title, text];
    return db.query(
        `INSERT INTO posts (username, city, headline, post) VALUES ($1, $2, $3, $4)`,
        params
    );
};

module.exports.filterPosts = (city) => {
    let params = [city];
    return db.query(
        `SELECT * FROM posts WHERE city=$1 ORDER BY id DESC LIMIT 10`,
        params
    );
};
