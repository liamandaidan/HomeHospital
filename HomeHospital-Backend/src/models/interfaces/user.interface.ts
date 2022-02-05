import address from './address.interface'
import email from './email.interface'

export default interface User {
	username: string
	firstName: string
	lastName: string
	emailAddress: email
	registrationDate: Date
	password: string
	address: address
}
