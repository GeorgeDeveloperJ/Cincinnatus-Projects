const orderStatus = () => {
  const status = Math.random() < 0.8;
  return status;
};

const pizzaOrder = new Promise((resolve, reject) => {
  setTimeout(() => {
    if(orderStatus()) {
      resolve("Your pizza is on its way!");
    } else {
      reject("Your order had problems!");
    }
  }, 3000);
});
 
const manageOrder = () => {pizzaOrder
  .then((result) => {console.log(result);})
  .catch((err) => {console.error(err);});
};

manageOrder()