import axios from "axios";
import { getToken } from "../../utils/storage";

export const BASE_URL = "http://localhost:8080/api";
//"https://eessefilme-production.up.railway.app/api";

export const api = axios.create({
  baseURL: BASE_URL,
});

const token = getToken();
api.defaults.headers.common["Authorization"] = token && "Bearer " + token;
