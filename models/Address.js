import mongoose from 'mongoose'
const AddressSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
             required: true,
            },
        fullname:{type:String,require:true},
        address:{type:String,require:true},
        city:{type:String,require:true},
        state:{type:String,require:true},
        country:{type:String,require:true},
        pincode:{type:Number,require:true},
        phoneNumber:{type:Number,require:true},
        createdAt:{type:Date,default:Date.now},

    },
    {timestamps:true})


    export const Address = mongoose.model("Address",AddressSchema)