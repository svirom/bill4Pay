const getBillData = async (guid) => {
  const response = await fetch(`https://api.bill4pay.com/v0/payments/${guid}/bitcoin`);
  
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Unable to get data');
  }
}

export { getBillData };