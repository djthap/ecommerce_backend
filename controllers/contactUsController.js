// emailController.js
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
	auth: {
		user: 'biteburst34@gmail.com',
		pass: 'myhqjoqiuabgbdoq',
	},
})

exports.sendEmail = (req, res) => {
	const { name, email, message } = req.body

	const mailOptions = {
		from: 'yourEmail@gmail.com',
		to: email,
		subject: 'Thank You for Contacting  ',
		text: `Hello ${name},\n\n${message}   \n Your message is been recieved to us we  get back to you   shortly. \n\nRegards,\nByteBurst Team`,
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error)
			res.status(500).send('Internal Server Error')
		} else {
			console.log('Email sent: ' + info.response)
			res.status(200).send('Email sent successfully')
		}
	})
}
