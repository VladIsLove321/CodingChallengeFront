import { client } from "../../config/axiosConfig";

export const submitRegister = async (data: {
  email: string;
  fullName: string;
  password: string;
}) => {
  try {
    const res = await client.post("/api/register", data);
    return res.data;
  } catch (error) {
    //There should be error handling
  }
};
