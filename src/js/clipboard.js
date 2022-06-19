const copyToClipboard = (button) => {
  const currentLink = button.closest('.bill4Pay-link');
  const currentAmount = currentLink.querySelector('.bill4Pay-link__value span').innerText; 
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    currentLink.querySelector('.bill4Pay-link__value').classList.add('copied');

    setTimeout(() => {
      currentLink.querySelector('.bill4Pay-link__value').classList.remove('copied');
    }, 200);

    return navigator.clipboard.writeText(currentAmount);
  }
  return Promise.reject('The Clipboard API is not available.');
};

export { copyToClipboard };