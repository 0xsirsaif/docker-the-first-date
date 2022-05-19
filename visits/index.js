const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
    // redis-server is a docker-compose service.
    host: "redis-server",
    // default port number for redis
    port: 6379
});

client.set("visits", 0);

app.get("/", (req, res) => {
    client.get("visits", (err, visits) => {
        res.send("#VISITS: " + visits);
        client.set("visits", parseInt(visits) + 1)
    });
});

app.listen(8081, () => {
    console.log("Listen on 8081");
})