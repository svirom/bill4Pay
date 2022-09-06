const getBillData = async (guid, currency) => {
  const response = await fetch(`https://api.bill4pay.com/v0/payments/${guid}/${currency}`);
  
  if (response.status === 200) {
    const data = await response.json();
    console.log(data, parseFloat(data.amount), parseFloat(data.fee_external));
    return data;
  } else {
    throw new Error('Unable to get data');
  }
}

export { getBillData };