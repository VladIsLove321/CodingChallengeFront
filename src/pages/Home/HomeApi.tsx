import { client } from "../../config/axiosConfig";

export const fetchUser = async () => {
  try {
    const res = await client.get("/api/user");
    return res.data;
  } catch (error) {}
};

export const logoutReq = async () => {
  try {
    const res = await client.get("/api/logout");
  } catch (error) {}
};
