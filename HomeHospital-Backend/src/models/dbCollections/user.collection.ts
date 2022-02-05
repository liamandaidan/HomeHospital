import { client } from '../../loaders/database'

const userCollection = client.db('homehospital-dev').collection('user')

export { userCollection }
userCollection.createIndex({'email':1})
 