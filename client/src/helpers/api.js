export const get = url =>
  fetch(url).then(response => {
    if (response.status !== 200) return response.status;
    return response.json();
  });

const apiCall = (url, method, body) =>
  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(response => response.json());

export const post = (url, body) => apiCall(url, "POST", body);

export const put = (url, body) => apiCall(url, "PUT", body);

export const destroy = url =>
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
