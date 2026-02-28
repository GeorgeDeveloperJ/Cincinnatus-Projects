function getOrder(order) {
  return new Promise((res, rej) => {
    console.log("Obtaining the order...");
      setTimeout(() => {
        console.log(`The order was... ${order}`);
        if (order != 'testing') {
          res("Order was succesfully obtained");
          } else {
          rej("Order couldn't be obtained, try again");
          }
    }, 5000);
  });
}

function processingOrder(result) {
  return new Promise(res => {
    console.log("Processing the order...");
    setTimeout(() => {
      res("Order succesfully processed:", result);
    }, 10000);
  });
}

async function makeOrder(person) {
  try {
    const result = await getOrder(person);
    console.log(result);
    console.log("Now we gotta get this order done");
    const resultProcessed = await processingOrder(result);
    console.log("Finished the order");
    console.log("GG's ez");
    console.log(resultProcessed);
  } catch (err) {
    console.log("There was an error:", err)
  }
}

makeOrder("Giordano");