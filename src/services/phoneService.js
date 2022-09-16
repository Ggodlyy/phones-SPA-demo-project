import * as request from "./requester";

const baseUrl = "http://localhost:3030/data/catalog";

export const getAll = () => request.get(baseUrl);

export const getOne = (id) => request.get(`${baseUrl}/${id}`);

export const create = (phoneData) => request.post(baseUrl, phoneData);

export const edit = (id, phoneData) =>
  request.put(`${baseUrl}/${id}`, phoneData);

export const remove = (id) => request.del(`${baseUrl}/${id}`);

export const buy = (id) => request.get(`${baseUrl}/buy/${id}`);

export const comment = (id, comment) => request.post(`${baseUrl}/comment/${id}`, comment);

// export const removeComment = ()
