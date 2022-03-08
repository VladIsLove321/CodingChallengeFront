import { client } from "../../config/axiosConfig";

export const submitLogin = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await client.post("/api/login", data);
    return res.data;
  } catch (error) {
    //There should be error handling
  }
};
