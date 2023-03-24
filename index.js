const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const DATABASE_CONNECTION = "mongodb+srv://swarajsaxena:BRXl9o58Wq4MghCy@cluster0.josfvge.mongodb.net/?retryWrites=true&w=majority";

mongoose
	.connect(DATABASE_CONNECTION, {
		useNewUrlParser: true,
	})
	.then(() => console.log('DB Connected'));

app.use(cors());
app.use(express.json());

const tripRoutes = require('./routes/tripRoutes');
const commentRoutes = require('./routes/commentRoutes');
const auth = require('./routes/auth');

app.use('/api', tripRoutes);
app.use('/api', commentRoutes);
app.use('/api', auth);

const port = 4000;

app.listen(port, () => {
	console.log(`Currently Listening at http://localhost:${port}`);
});
