import { chooseLang } from '@/js/lang';

const renderModal = (id, currency, lang, data) => {
  // console.log(`Address: ${data.address}`);
  // console.log(`Amount: ${data.amount}`);
  // console.log(`Currency ISO: ${data.currency_iso}`);
  // console.log(`QR Link: ${data.qr_link}`);
  // console.log(`Deadline at: ${data.deadline_at}`);
  // console.log(`Paid at: ${data.paid_at}`);
  // console.log(`Currency: ${currency}`);

  chooseLang[lang] ? lang : lang = 'en-US';

  const modalContainer = document.createElement('div');
  const modalDialog = document.createElement('div');

  const modalClose = document.createElement('div');

  const modalCurrency = document.createElement('div');

  const modalCounter = document.createElement('div');
  const modalCounterProgress = document.createElement('div');
  const modalCounterProgressSpan = document.createElement('span');
  const modalCounterText = document.createElement('div');
  const modalCounterTime = document.createElement('div');
  const modalCounterHours = document.createElement('span');
  const modalCounterMinutes = document.createElement('span');
  const modalCounterSeconds = document.createElement('span');

  const modalQr = document.createElement('div');
  const modalQrImg = document.createElement('img');

  const modalAddress = document.createElement('div');
  const modalAddressValue = document.createElement('div');
  const modalAddressCopy = document.createElement('div');
  const modalAddressCopySpan = document.createElement('span');

  const modalAmount = document.createElement('div');
  const modalAmountValue = document.createElement('div');
  const modalAmountCopy = document.createElement('div');
  const modalAmountCopySpan = document.createElement('span');

  const modalButtonContainer = document.createElement('div');
  const modalButton = document.createElement('button');

  modalContainer.id = id;
  modalContainer.classList.add('bill4Pay');
  document.body.appendChild(modalContainer);

  modalDialog.classList.add('bill4Pay-dialog');
  modalContainer.appendChild(modalDialog);

  // close button
  modalClose.id = 'bill4Pay-close';
  modalClose.classList.add('bill4Pay-close');
  modalDialog.appendChild(modalClose);

  // currency
  modalCurrency.classList.add('bill4Pay-currency', currency);
  modalDialog.appendChild(modalCurrency);

  // counter
  modalCounter.classList.add('bill4Pay-counter', 'bill4Pay-row');
  modalCounterProgress.classList.add('bill4Pay-counter__progress');
  modalCounterProgress.appendChild(modalCounterProgressSpan);
  modalCounterText.classList.add('bill4Pay-counter__text');
  modalCounterText.textContent = chooseLang[lang].text;
  modalCounterTime.classList.add('bill4Pay-counter__time');
  modalCounterHours.classList.add('bill4Pay-counter__hours');
  modalCounterHours.textContent = '00';
  modalCounterTime.appendChild(modalCounterHours);
  modalCounterTime.append(':');
  modalCounterMinutes.classList.add('bill4Pay-counter__minutes');
  modalCounterMinutes.textContent = '00';
  modalCounterTime.appendChild(modalCounterMinutes);
  modalCounterTime.append(':');
  modalCounterSeconds.classList.add('bill4Pay-counter__seconds');
  modalCounterSeconds.textContent = '00';
  modalCounterTime.appendChild(modalCounterSeconds);
  modalCounter.appendChild(modalCounterProgress);
  modalCounter.appendChild(modalCounterText);
  modalCounter.appendChild(modalCounterTime);
  modalDialog.appendChild(modalCounter);

  // qr
  modalQr.classList.add('bill4Pay-qr', 'bill4Pay-row');
  modalQrImg.src = data.qr_link;
  modalQr.appendChild(modalQrImg);
  modalDialog.appendChild(modalQr);

  // address
  modalAddress.classList.add('bill4Pay-link', 'bill4Pay-row');
  modalAddressValue.classList.add('bill4Pay-link__value');
  modalAddressValue.textContent = data.address;
  modalAddressCopy.classList.add('bill4Pay-link__clipboard');
  modalAddressCopySpan.textContent = chooseLang[lang].address;
  modalAddressCopy.appendChild(modalAddressCopySpan);
  modalAddress.appendChild(modalAddressValue);
  modalAddress.appendChild(modalAddressCopy);
  modalDialog.appendChild(modalAddress);

  // amount
  modalAmount.classList.add('bill4Pay-link', 'bill4Pay-row');
  modalAmountValue.classList.add('bill4Pay-link__value');
  modalAmountValue.textContent = data.amount;
  modalAmountCopy.classList.add('bill4Pay-link__clipboard');
  modalAmountCopySpan.textContent = chooseLang[lang].amount;
  modalAmountCopy.appendChild(modalAmountCopySpan);
  modalAmount.appendChild(modalAmountValue);
  modalAmount.appendChild(modalAmountCopy);
  modalDialog.appendChild(modalAmount);

  // button
  modalButtonContainer.classList.add('bill4Pay-button');
  modalButton.type = 'button'; 
  modalButton.classList.add('bill4Pay-button__pay');
  modalButton.textContent = chooseLang[lang].pay;
  modalButtonContainer.appendChild(modalButton);
  modalDialog.appendChild(modalButtonContainer); 
}

export { renderModal };
