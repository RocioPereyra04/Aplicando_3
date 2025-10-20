import promptSync from "prompt-sync";
const prompt = promptSync();

class Calculadora {
  private num1: number;
  private num2: number;

  constructor(num1: number, num2: number) {
    this.num1 = num1;
    this.num2 = num2;
  }

  public sumar(): number {
    return this.num1 + this.num2;
  }

  public restar(): number {
    return this.num1 - this.num2;
  }

  public multiplicar(): number {
    return this.num1 * this.num2;
  }

  public dividir(): number | string {
    if (this.num2 !== 0) {
      return this.num1 / this.num2;
    } else {
      return "Error: no se puede dividir por cero.";
    }
  }
}


const num1: number = parseFloat(prompt("Ingrese el primer número: "));
const num2: number = parseFloat(prompt("Ingrese el segundo número: "));


const calc = new Calculadora(num1, num2);

// Menú de opciones
console.log("\nSeleccione la operación:");
console.log("1. Suma");
console.log("2. Resta");
console.log("3. Multiplicación");
console.log("4. División");

const opcion: string = prompt("Ingrese la opción: ");
let resultado: number | string | undefined;

switch (opcion) {
  case "1":
    resultado = calc.sumar();
    break;
  case "2":
    resultado = calc.restar();
    break;
  case "3":
    resultado = calc.multiplicar();
    break;
  case "4":
    resultado = calc.dividir();
    break;
  default:
    console.log("Opción no válida.");
    break;
}


if (resultado !== undefined) {
  console.log("El resultado es: " + resultado);
}
