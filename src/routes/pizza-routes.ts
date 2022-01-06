import express from "express";

const pizzaRoutes = express.Router();

let toppings: Array<string> = [
	"Pepperoni",
	"Bacon",
	"Sausage",
	"Ham",
	"Onion",
	"Green Pepper",
	"Banana Pepper",
	"Mushroom",
	"Spinach",
	"Artichoke",
];

pizzaRoutes.get("/", function (req, res) {
	res.render("home");
});

pizzaRoutes.get("/special", function (req, res) {
	let name: string = req.query.name as string;
	let price: string = req.query.price as string;

	res.render("specialty", { name, price });
});

pizzaRoutes.get("/review", function (req, res) {
	res.render("review");
});

pizzaRoutes.post("/results", function (req, res) {
	let name: string = req.body.name as string;
	let comment: string = req.body.comment as string;
	let rating: number = req.body.rating;
	res.render("results", { name, comment, rating });
});

pizzaRoutes.get("/build", function (req, res) {
	res.render("build", { toppings });
});

pizzaRoutes.post("/build-results", function (req, res) {
	let size: string = req.body.sizes as string;
	let toppings: number = Number(req.body.toppings as string);
	let gluten: boolean = Boolean(req.body.gluten as string);
	let instructions: string = req.body.instructions as string;

	let price: number = 0;
	let freeDelivery: boolean = false;

	if (size === "Large") price += 12 + toppings * 1.25;
	if (size === "Medium") price += 10 + toppings * 1;
	if (size === "Small") price += 7 + toppings * 0.5;
	if (gluten) price += 2;
	if (price >= 15) freeDelivery = true;

	res.render("build-results", {
		size,
		toppings,
		gluten,
		instructions,
		price,
		freeDelivery,
	});
});

export default pizzaRoutes;
