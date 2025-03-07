require('dotenv').config();

const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/football-bingo', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`