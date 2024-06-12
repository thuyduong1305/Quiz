import { get, post } from "../utils/request"

export const getUser = async (email = "", password = "") => {
  let pass = "";
  if(password !== "") {
    pass = `&password=${password}`;
  }
  const result = await get(`users?email=${email}${pass}`);
  return result;
}

export const createUser = async (options) => {
  const result = await post(`users`, options);
  return result;
}