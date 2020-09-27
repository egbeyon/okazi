const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require('cors')

const users = require("./routes/api/users");
const projects = require("./routes/api/projects");
const tasks = require("./routes/api/tasks");
const geofield = require("./routes/api/geofield");

require('dotenv').config();

const app = express();

app.use(cors())
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config

const uri = process.env.ATLAS_URI;

// Connect to MongoDB
//mongoose.connect("mongodb://localhost:27017/rishipGeospatial")



mongoose.connect(uri, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
  )
  // .then(() => console.log('MongoDB Connected'))
  // .catch(err => console.log(err)
  // );
  const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);


app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/tasks", tasks);
app.use("/api/fields", geofield);

// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
