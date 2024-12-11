import mongoose, { Schema } from "mongoose";



const addressSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["home", "work", "friend & family"]
    },
    address: {
        longitude: Number,
        latitude: Number,
        city: String,
        state: String,
        country: String,
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });



export const Address = mongoose.model("Address", addressSchema);