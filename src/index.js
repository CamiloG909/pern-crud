const express = require("express");
const app = express();

app.use(express.json());

// Routes
app.use(require("./routes/tasks.routes"));

app.listen(4000, () => console.log("Server is running on port 4000"));
