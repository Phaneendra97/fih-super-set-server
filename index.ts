import express from "express";
import bodyParser from "body-parser";
import path from "path";
import userProfileRoutes from "./routes/userProfile";
import authRoutes from './routes/authRoutes';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")))
   .set("views", path.join(__dirname, "views"))
   .set("view engine", "ejs");

app.use(express.json()); // For parsing JSON request bodies
app.use(authRoutes);

app.use('/', userProfileRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api", (req, res) => {
  res.json({ msg: "Hello world" });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
