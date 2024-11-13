export const getTest = (req, res) => {
  console.log("weo");

  res.send({ status: "OK", data: "hola soy el test" });
};
