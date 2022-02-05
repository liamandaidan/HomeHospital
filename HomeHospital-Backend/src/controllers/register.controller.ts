import bcrypt from 'bcryptjs'
const { genSalt, hash } = bcrypt

export async function registerUser(email: string, password: string):Promise<boolean> {
	const { userCollection }:any = await import('../models/dbCollections/user.collection')

	const result = await userCollection.findOne({
		email: email,
	})
	//console.log('results: ' + result)
    if(result === null){

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        const inserted = await userCollection.insertOne({
            email: email,
            password: hashedPassword
        })

      console.log(inserted)
      return true
    } else {
        console.log('User already registered')
        return false
    }
}
