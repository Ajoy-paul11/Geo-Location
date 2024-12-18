import { Address } from "../models/address.model.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


export const createAddress = AsyncHandler(async (req, res, next) => {
    const { type, address } = req.body
    if (!type || !address) {
        const error = new ApiError(401, "All fields are required")
        return next(error)
    }

    const newAddress = await Address.create(
        {
            type,
            address: {
                longitude: address.longitude,
                latitude: address.latitude,
                city: address.city,
                street: address.street,
                area: address.area,
                houseNo: address.houseNo
            },
            user: req.user._id
        }
    )

    return res
        .status(201)
        .json(
            new ApiResponse(201, { address: newAddress }, "Address created successfully")
        )
})


export const getAddresses = AsyncHandler(async (req, res, next) => {
    const addresses = await Address.find({ user: req.user._id }).sort({ createdAt: -1 })
    return res
        .status(200)
        .json(
            new ApiResponse(200, { addresses }, "Addresses fetched successfully")
        )
})


export const updateAddress = AsyncHandler(async (req, res, next) => {
    const { type, address } = req.body
    const { id } = req.params

    if (!type || !address) {
        const error = new ApiError(401, "All fields are required")
        return next(error)
    }
    const existingAddress = await Address.findOne({
        _id: id
    });

    if (!existingAddress) {
        return next(new ApiError(404, "Address not found"));
    }

    const updatedAddress = await Address.findOneAndUpdate(
        { _id: id },
        {
            type,
            address: {
                longitude: address.longitude,
                latitude: address.latitude,
                city: address.city,
                street: address.street,
                area: address.area,
                houseNo: address.houseNo
            },
            user: req.user._id
        },
        { new: true }
    )

    return res
        .status(201)
        .json(
            new ApiResponse(201, { address: updatedAddress }, "Address updated successfully")
        )
})



export const deleteAddress = AsyncHandler(async (req, res, next) => {
    const { id } = req.params
    const existingAddress = await Address.findOne({
        _id: id,
    })

    if (!existingAddress) {
        return next(new ApiError(404, "Address not found"));
    }

    await Address.findOneAndDelete({ _id: id })

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Address deleted successfully")
        )
})

