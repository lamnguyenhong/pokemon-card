import axios from "axios";

export const axiosApiInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
