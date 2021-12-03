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

  let responseBody = null;

  try {
    responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);
  } catch (e) {
    console.log(response);
    if (!response.ok) throw new Error('Something went wrong');
  }
  return responseBody;
};

export const redirect = url => {
  window.location.href = url;
};

export const getRelativeUrl = () =>
  window.location.pathname + window.location.search;
