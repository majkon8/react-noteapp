const serverUrl = "http://localhost:3000";

export const notesUrl = id =>
  id ? `${serverUrl}/notes/${id}` : `${serverUrl}/notes`;
