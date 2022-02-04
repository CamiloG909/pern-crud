require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Routes
app.use(require("./routes/tasks.routes"));

app.use((err, req, res, next) => {
	return res.status(500).json({
		message: err.message,
	});
});

app.listen(4000, () => console.log("Server is running on port 4000"));
