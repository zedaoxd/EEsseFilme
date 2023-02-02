import axios from "axios";
import { getToken } from "../../utils/storage";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

const token = getToken();
api.defaults.headers.common["Authorization"] = token && "Bearer " + token;
