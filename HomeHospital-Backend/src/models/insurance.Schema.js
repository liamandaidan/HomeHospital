import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema({
    Policy_Holder_Id: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    Carrier_Name: String,
    Carrier_Code: String,
    Policy_Number: String,
    Group_Number: String,
    Effective_Date: {
        From: Date,
        To: Date
    },
    Additional_1: String,
    Additional_2: String,
    Additional_3: String
})

export default mongoose.model('Insurance', insuranceSchema)
