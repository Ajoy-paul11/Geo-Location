import { Router } from "express";
import { createAddress, getAddresses, updateAddress, deleteAddress } from "../controllers/address.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.use(verifyUser)

router.route("/create").post(createAddress)
router.route("/").get(getAddresses)
router.route("/update/:id").put(updateAddress)
router.route("/delete/:id").delete(deleteAddress)


export default router;