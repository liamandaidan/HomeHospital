import { client } from '../loaders/database'

type person = {
    name:string,
    age: number
}
export async function insertValue(person:person){
    
    await client.db('homehopsital-dev').collection('user').insertOne({ person})
    console.log('Value inserted!')
}
