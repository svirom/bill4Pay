const fontAdd = (fontLink) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fontLink;
  document.head.appendChild(link); 
}

export { fontAdd };