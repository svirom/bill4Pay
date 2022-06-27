const linkAdd = (styleLink) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = styleLink;
  document.head.appendChild(link); 
}

export { linkAdd };