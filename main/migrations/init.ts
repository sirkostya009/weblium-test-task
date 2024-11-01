import { Db } from "mongodb";

export default async (db: Db) =>
	Promise.all([
		db.collection("categories").insertMany([
			{
				_id: 1,
				name: "Car",
				description: "Cars. Don't we love em",
				image: "https://robbreport.com/wp-content/uploads/2022/04/speedtail04.jpg?w=1000",
				parentCategoryId: null,
			},
			{
				_id: 2,
				name: "Hatchback",
				description:
					"Hatchbacks are compact cars with a two-box design, featuring a rear door that swings upward for easy access to the cargo area. They offer versatile storage space, often with foldable rear seats, and provide good fuel efficiency and maneuverability.",
				image: "https://imgcdn.zigwheels.my/large/gallery/color/25/1564/toyota-yaris-color-150322.jpg",
				parentCategoryId: 1,
			},
			{
				_id: 3,
				name: "Sedan",
				description:
					"Sedans are passenger cars with a three-box design, featuring four doors and a separate trunk. They offer spacious interiors, balanced handling, and focus on comfort and fuel efficiency.",
				image: "https://images.dealer.com/ddc/vehicles/2024/Hyundai/Sonata%20Hybrid/Sedan/trim_SEL_ccf45e/perspective/side-left/2024_24.png",
				parentCategoryId: 1,
			},
		]),
		db.collection("cars").insertMany([
			{
				name: "Honda Civic Type R",
				price: 15000.0,
				color: "Blue",
				description: "The legendary Honda Civic Type R",
				categoryId: 2,
				image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
			},
			{
				name: "Porsche Taycan",
				price: 110000.0,
				color: "White",
				description: "Porsche's first pure electric car",
				categoryId: 3,
				image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/2020_Porsche_Taycan_4S_79kWh_Front.jpg",
			},
		]),
	]);
