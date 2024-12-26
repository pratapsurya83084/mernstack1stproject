import express from "express";
import { addressmiddlewaere } from "../middlewares/Auth.js";
import { AddressUser,getUserAddress } from "../controllers/AddressUser.js";

const router = express.Router();
//add address router
router.post("/addaddress", addressmiddlewaere, AddressUser);
//get address router
router.get("/getUserAddress",addressmiddlewaere, getUserAddress);

export default router;
