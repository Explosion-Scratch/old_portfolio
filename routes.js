const data = require("./spreadsheet.js");
module.exports = async (app) => {
	const express = require("express");
	app.use(express.static(`${__dirname}/public`))
	app.get("/", async (req, res) => {
		const projects = await data();
		res.render("home", {projects: projects})
	})
	app.get("/search", async(req, res) => {
		const Fuse = require('fuse.js');
		const fuse = new Fuse(await data(), {
			keys: ['description', 'title', 'realtags'],
			threshold: 0.3
		})
		if (!req.query.q){
			res.redirect("/");
			return;
		}
		const search = fuse.search(req.query.q || "");
		res.render("home", {
			projects: search.map(i => i.item),
			search: req.query.q,
			searching: true,
		})
	})
	app.get("/home", async (req, res) => {
		res.render("landing", {projects: (await data()).slice(0, 3)})
	})
}