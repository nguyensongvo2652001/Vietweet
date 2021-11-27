/*eslint-disable*/

export const sendRequest = async (url, method, body) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);
};
