import * as api from "./api";

export const notesUrl = (id) => (id ? `/notes/${id}` : `/notes`);

export const getAll = () => api.get(notesUrl());

export const get = (id) => api.get(notesUrl(id));

export const create = (body) => api.post(notesUrl(), body);

export const update = (id, body) => api.put(notesUrl(id), body);

export const destroy = (id) => api.destroy(notesUrl(id));
