const copyToClipboard = (button) => {
  const currentLink = button.closest('.bill4Pay-link');
  const currentAmount = currentLink.querySelector('.bill4Pay-link__value').innerText; 
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(currentAmount);
  }
  return Promise.reject('The Clipboard API is not available.');
};

export { copyToClipboard };