const Operaciones = {};

function add(x1, x2) {
  return x1 + x2;
}

function restract(x1, x2) {
  return x1 - x2;
}

function multiply(x1, x2) {
  return x1 * x2;
}

function divide(x1, x2) {
  if (x2 == 0) {
    console.log('no se puede dividir por 0');
  }else{
    return x1 / x2;
  }
}

Operaciones.add = add;
Operaciones.restract = restract;
Operaciones.multiply = multiply;
Operaciones.divide = divide;

module.exports = Operaciones;




