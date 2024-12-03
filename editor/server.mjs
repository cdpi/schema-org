
import express from "express";
import nunjucks from "nunjucks";
//import { model } from "./model.mjs";

// node --experimental-sqlite server.mjs

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

nunjucks.configure("views", {express: app, autoescape: true, watch: true});

app.get("/", (request, response) =>
	{
	response.render("home.njk", {abc: "Kamelott"});
	});

//app.use("/api", model);

app.listen(3000);
