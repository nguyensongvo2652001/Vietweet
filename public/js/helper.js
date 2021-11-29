/*eslint-disable*/

export const sendRequest = async (url, method, body, isFormData = false) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  let sentData = JSON.stringify(body);

  if (isFormData) {
    headers = {};
    sentData = body;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: sentData
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);
};

export const redirect = url => {
  window.location.href = url;
};
