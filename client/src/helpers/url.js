const serverUrl = "http://localhost:3000";

export const notesUrl = id =>
  id ? `/notes/${id}` : `/notes`;
