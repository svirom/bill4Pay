const getBillData = async (guid, currency) => {
  const response = await fetch(`https://api.bill4pay.com/v0/payments/${guid}/${currency}`);
  
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Unable to get data');
  }
}

export { getBillData };