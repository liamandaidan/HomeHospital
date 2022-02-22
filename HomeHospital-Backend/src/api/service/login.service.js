import bcrypt from 'bcryptjs'
import PatientModel from '../../models/patient.Model.js'

const { compare } = bcrypt

export async function logUserIn(req, res, next) {
	const { email, password } = req.body

	const user = await UserSchema.findOne({ email: email })
	// console.log(`from the login service: ${user}`)
	// Compare the password with one in the DB
	console.log("User: " + user);
	if(user)
	{
		const isAuthorized = await compare(password, user.password)
		req.authUser = { status: isAuthorized, user: user };
		
	}
	next(); 
};

