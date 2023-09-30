//imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const furnitureRoutes = require("./routers/furnitureRoute");
const furnitureModel = require("./models/furnitureModel");

const app = express();
const PORT = process.env.PORT || 3000;

//database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to the database!"));

app.use(express.static("public"));

//add furniture route
app.use("/api", furnitureRoutes);
app.get("/furniture", async (req, res) => {
  try {
    // Fetch furniture data and pass it to the template
    const furnitures = await furnitureModel.find();
    res.render("furniture", { furnitures });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

//middelwares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// set template engine
app.set("view engine", "ejs");

//route prefix
app.use("", require("./routers/routes"));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
