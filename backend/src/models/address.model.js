import mongoose, { Schema } from "mongoose";



const addressSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["home", "office", "friend & family"]
    },
    address: {
        longitude: Number,
        latitude: Number,
        houseNo: Number,
        street: String,
        area: String,
        city: String,
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