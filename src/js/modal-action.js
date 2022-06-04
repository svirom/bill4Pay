const modalAction = (id, action, e) => {
  const modal = document.querySelector(`#${id}`);

  if (action === 'open') {
    modal.classList.add('active');
    modal.classList.add('modal-open');
    document.body.classList.add('overflow-hidden');
  }

  if (action === 'close') {
    modal.classList.remove('active');
    modal.classList.remove('modal-open');
    document.body.classList.remove('overflow-hidden');
  }

  if (action === 'closeOutside') {
    const matchesModal = e.target.matches(`#${id}`);

    if ( matchesModal && !e.target.parentElement.classList.contains('.bill4Pay-dialog') ) {
      modal.classList.remove('active');
      modal.classList.remove('modal-open');
      document.body.classList.remove('overflow-hidden');
    }
  }
}

export { modalAction };