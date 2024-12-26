import { Address } from "../models/Address.js";

export const AddressUser = async (req, res) => {
  let { fullname, address, city, state, country, pincode, phoneNumber } =
    req.body;

  console.log(fullname, address, city, state, country, pincode, phoneNumber);

  const data = await Address.create({
    userId: req.user,
    fullname,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  });

  return res.json({
    message: "Address added successfully",
    UserData: data,
    success: true,
  });
};

export const getUserAddress = async (req, res) => {

  const getUserAddr = await Address.find({userId:req.user}).sort({createdAt:-1});
  console.log(getUserAddr);
  if (!getUserAddr){
    return res.json({ message : "No address found", sucess: false });

  }
  else{
    return res.json({ message:"message" ,  address: getUserAddr[0]})
  }
};
