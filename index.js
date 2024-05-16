const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pushNotifications = require('node-pushnotifications');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

const publicVapidKey = "BNmO7o29hUpkX3h_0vE36sVXgtSWMYc6ydzC2oKp1CSV_DQWI8u_cp9tOKpA-36NCQo_lj5E9XNJgobGNcML57I";
const privateVapidKey = "Ykle-_obRW91E4Q8P55Y6JThKJeHe0iQha9zKZ_hq7E";
const subject = "mailto: <egorasonovvv@gmail.com>";

app.post("/subscribe", (req) => {
    const subscription = req.body;
    const settings = {
        web: {
            vapidDetails: {
                subject: subject,
                publicKey: publicVapidKey,
                privateKey: privateVapidKey,
            },
            gcmAPIKey: "gcmkey",
            TTL: 2419200,
            contentEncoding: "aes128gcm",
            headers: {},
        },
        isAlwaysUseFCM: false,
    };
    const push = new pushNotifications(settings);
    const payload = { title: "Notification from Knock" };
    push.send(subscription, payload, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));