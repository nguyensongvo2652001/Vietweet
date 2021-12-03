/*eslint-disable*/

export const showAlert = (type, msg, time = 5) => {
  const markup = `<div class = 'alert alert--${type}'>${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, time * 1000);
};

const hideAlert = () => {
  document.querySelector('.alert').remove();
};
