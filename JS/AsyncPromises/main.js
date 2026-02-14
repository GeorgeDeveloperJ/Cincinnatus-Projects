const datos = [
  {
    id: 1,
    title: "Iron Man",
    year: 2008,
  },
  {
    id: 2,
    title: "Spiderman: Homecoming",
    year: 2017,
  },
  {
    id: 3,
    title: "Avengers: Endgame",
    year: 2019,
  },
];

// const getDatos = () => {
//     return datos;
// }

const getDatos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (datos.length === 0) {
        reject(console.error("no hay datos"));
      }
      resolve(datos);
    }, 1500);
  });
};

//Formato de promises, .then para esperar (puede ser anidado), .catch para errores
// getDatos().then((datos) => console.log(datos));

//Formato async await, se usa el await para las promesas, y el async para declarar las funciones. Los errores se manejan con try n catch
async function fetchingData() {
    try{
        const dataFetched = await getDatos();
        console.log(dataFetched);
    } catch (e) {
        console.log(e);
    }
}
fetchingData();