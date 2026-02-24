function orderProduct(product) {
  return new Promise((resolve, reject) => {
    console.log(`Ordering: ${product} of Anthony's Store.`);
    setTimeout(() => {
      if(product === 'cup') {
        resolve("Ordering a cup of Anthony's store");
      }
      else {
        reject("No disponible at this moment");
      }
    }, 2000);
  });
}

function processingOrder(result) {
  return new Promise(resolve => {
    console.log("Processing the order.");
    console.log(`The result was: '${result}'`);
    setTimeout(() => {
      resolve("Thanks for using our services. Enjoy ur product.");
    }, 3000);
  })
};

async function makeOrder(order) {
  try {
    const result = await orderProduct(order);
    console.log("Result obtained");
    const processedResult = await processingOrder(result);
    console.log(processedResult); 
  } catch (err) {
    console.error('There was an error: ', err.message ?? err);
  }
}

makeOrder('cup')

// Then and catch chaining

/* orderProduct('bottle')
  .then(result => {
    console.log('Returns received');
    console.log(result);
    return processingOrder(result);
  })
  .then((result) => {
    console.log(result);
  })
  .catch(err => {
    console.error("There was an err: ", err.message ?? err);
  });
*/

