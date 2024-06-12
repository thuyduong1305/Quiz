import { getCookie } from "../helpers/cookie";
import { get, post } from "../utils/request";

export const createAnswer = async (options) => {
  const result = await post(`answers`, options);
  return result;
}

export const getAnswer = async (id) => {
  const result = await get(`answers/${id}`);
  return result;
}

export const getAnswerByUserId = async () => {
  const userId = getCookie("id");
  const result = await get(`answers?userId=${userId}`);
  return result;
}