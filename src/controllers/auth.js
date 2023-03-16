const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createJWT } = require('../utils/auth.js');

exports.signup = (req, res, next) => {
	let { username, email, password, name } = req.body;

	User.findOne({ email })
		.then(user => {
			if (user) {
				return res.json({
					success: false,
					message: 'email already exists',
				});
			} else {
				User.findOne({ username })
					.then(user => {
						if (user) {
							return res.json({
								success: false,
								message: 'username already exists',
							});
						} else {
							const user = new User({
								username: username,
								name: name,
								email: email,
								password: password,
							});
							bcrypt.genSalt(10, function (err, salt) {
								bcrypt.hash(password, salt, function (err, hash) {
									if (err) throw err;
									user.password = hash;
									user.save()
										.then(response => {
											res.status(200).json({
												success: true,
												user: {
													email: response.email,
													username: response.username,
													id: response._id,
												},
											});
										})
										.catch(err => {
											res.status(500).json({
												success: false,
												error: err.message,
											});
										});
								});
							});
						}
					})
					.catch(err => {
						res.status(500).json({
							message: err.message,
						});
					});
			}
		})
		.catch(err => {
			res.status(500).json({
				message: err.message,
			});
		});
};

exports.signin = (req, res) => {
	let { username, password } = req.body;
	User.findOne({ username })
		.then(user => {
			if (!user) {
				return res.json({ success: false, message: "user doesn't exists" });
			} else {
				bcrypt
					.compare(password, user.password)
					.then(isMatch => {
						if (!isMatch) {
							return res
								.status(200)
								.json({ success: false, message: 'password incorrect' });
						}
						let access_token = createJWT(user.email, user._id, 3600);
						jwt.verify(
							access_token,
							process.env.TOKEN_SECRET,
							(err, decoded) => {
								if (err) {
									res.status(500).json({ erros: err });
								}
								if (decoded) {
									return res.status(200).json({
										success: true,
										token: access_token,
										user,
									});
								}
							}
						);
					})
					.catch(err => {
						res.status(500).json({ error: err });
					});
			}
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
};

exports.getUserFromToken = (req, res) => {
	const token = req.headers.auth_token;

	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ success: false, message: 'Invalid token' });
		} else {
			User.findById(decoded.userId)
				.then(user => {
					if (!user) {
						return res
							.status(404)
							.json({ success: false, message: 'User not found' });
					} else {
						return res.status(200).json({ success: true, user });
					}
				})
				.catch(err => {
					return res.status(500).json({ success: false, message: err.message });
				});
		}
	});
};
