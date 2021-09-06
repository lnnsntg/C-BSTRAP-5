const precio = document.getElementById("precio");
const vistas = document.getElementById("vistas");
const inputRango = document.getElementById("customRange3");
const arrayVisitas = ["10k", "50k", "100k", "500k", "1M"];
console.log(inputRango.value);

inputRango.addEventListener("input", () => {
  precio.textContent = inputRango.value;
  console.log(inputRango.value);
  vistas.textContent = arrayVisitas[inputRango.value / 8 - 1];
});
