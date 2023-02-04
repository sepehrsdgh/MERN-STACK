module.exports = (tempProduct, ele) => {
  let output = tempProduct
    .replace(/{%PRODUCTNAME%}/g, ele.productName)
    .replace(/{%IMAGE%}/g, ele.image)
    .replace(/{%QUANTITY%}/g, ele.quantity)
    .replace(/{%PRICE%}/g, ele.price)
    .replace(/{%FROM%}/g, ele.from)
    .replace(/{%NUTRIENTS%}/g, ele.nutrients)
    .replace(/{%DESCRIPTION%}/g, ele.description)
    .replace(/{%ID%}/g, ele.id);
  if (!ele.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};
