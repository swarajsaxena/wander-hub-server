const express = require('express');

// const morgan = require('morgan');
// const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

const DATABASE_CONNECTION = process.env.DATABASE_URL;

mongoose
	.connect(DATABASE_CONNECTION, {
		useNewUrlParser: true,
	})
	.then(() => console.log('DB Connected'));

// app.use(morgan('common'));
// app.use(helmet());
// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

app.use(cors());
app.use(express.json());

const tripRoutes = require('./routes/tripRoutes');
const commentRoutes = require('./routes/commentRoutes');
const auth = require('./routes/auth');

// app.use('/', (req, res) => {
// 	res.status(200).json({ message: 'backend for wander hub' });
// });

app.use('/api', tripRoutes);
app.use('/api', commentRoutes);
app.use('/api', auth);

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Currently Listening at http://localhost:${port}`);
});
