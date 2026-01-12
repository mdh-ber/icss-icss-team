import axios from "axios";

const API_URL = "http://localhost:5000/modules";

export const getModules = () => axios.get(API_URL);
export const createModule = (module) => axios.post(API_URL, module);
export const updateModule = (id, module) =>
  axios.put(`${API_URL}/${id}`, module);
export const deleteModule = (id) =>
  axios.delete(`${API_URL}/${id}`);
