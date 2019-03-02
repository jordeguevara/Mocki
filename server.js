const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
    console.log(`Server at: http://localhost:${app.get("port")}/`);
});