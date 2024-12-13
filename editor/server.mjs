
import express from "express";
import nunjucks from "nunjucks";

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(process.env.WWW));

nunjucks.configure("views", {express: app, autoescape: true, watch: true});

app.get("/", (request, response) =>
	{
	response.render("home.njk");
	});

app.listen(process.env.PORT);
