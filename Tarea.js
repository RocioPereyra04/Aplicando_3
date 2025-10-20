import promptSync from 'prompt-sync';
const prompt = promptSync();

const ESTADOS = {
    PENDIENTE: 'Pendiente',
    EN_CURSO: 'En curso',
    TERMINADA: 'Terminada',
    CANCELADA: 'Cancelada'
};

const DIFICULTADES = {
    1: '⭐ Fácil',
    2: '⭐⭐ Medio',
    3: '⭐⭐⭐ Difícil'
};

// ---- CONSTRUCTOR PROTOTÍPICO ----
function Tarea(titulo, opciones = {}) {
    this.titulo = titulo;
    this.descripcion = opciones.descripcion || '';
    this.estado = opciones.estado || ESTADOS.PENDIENTE;
    this.dificultad = opciones.dificultad || 1;
    this.fechaCreacion = new Date();
    this.fechaVencimiento = opciones.fechaVencimiento
        ? new Date(opciones.fechaVencimiento)
        : null;
}

// ---- MÉTODOS PROTOTÍPICOS ----
Tarea.prototype.mostrarDetalle = function () {
    console.log(`\nTítulo: ${this.titulo}`);
    console.log(`Descripción: ${this.descripcion || '(Sin descripción)'}`);
    console.log(`Estado: ${this.estado}`);
    console.log(`Dificultad: ${DIFICULTADES[this.dificultad]}`);
    console.log(`Creación: ${this.fechaCreacion.toLocaleDateString()}`);
    if (this.fechaVencimiento) {
        console.log(`Vencimiento: ${this.fechaVencimiento.toLocaleDateString()}`);
    }
};

// ---- LISTA DE TAREAS ----
const tareas = [];

// -------- MENÚ PRINCIPAL ----------
function mostrarMenuPrincipal() {
    console.log("\n==============================");
    console.log("GESTOR DE TAREAS - MENÚ");
    console.log("==============================");
    console.log("¿Qué deseas hacer?");
    console.log("1. Ver Mis Tareas.");
    console.log("2. Buscar una Tarea.");
    console.log("3. Agregar una Tarea.");
    console.log("4. Salir.");
}

// -------- PATH 1: VER TAREAS ----------
function menuVerTareas() {
    console.log("\n¿Qué tareas deseas ver?");
    console.log("1. Todas");
    console.log("2. Pendientes");
    console.log("3. En curso");
    console.log("4. Terminadas");
    console.log("5. Volver");

    const opcion = prompt("> ");
    switch (opcion) {
        case "1": mostrarListaTareas(); break;
        case "2": mostrarListaTareas(ESTADOS.PENDIENTE); break;
        case "3": mostrarListaTareas(ESTADOS.EN_CURSO); break;
        case "4": mostrarListaTareas(ESTADOS.TERMINADA); break;
        case "5": return;
        default: console.log("Opción inválida");
    }
}

function mostrarListaTareas(filtro = null) {
    const filtradas = filtro ? tareas.filter(t => t.estado === filtro) : tareas;
    if (filtradas.length === 0) {
        console.log("No hay tareas.");
        return;
    }
    console.log("\nEstas son tus tareas:");
    filtradas.forEach((t, i) => console.log(`[${i + 1}] ${t.titulo}`));

    const num = prompt("¿Ver detalles de alguna? Ingresa número o 0 para volver: ");
    if (num !== "0") {
        const idx = Number(num) - 1;
        if (filtradas[idx]) {
            mostrarDetalleEditable(filtradas[idx]);
        }
    }
}

function mostrarDetalleEditable(tarea) {
    console.log("\nEsta es la tarea que elegiste:");
    tarea.mostrarDetalle();
    const opcion = prompt("Si deseas editarla, presiona E, o 0 para volver: ");
    if (opcion.toUpperCase() === "E") {
        editarTarea(tarea);
    }
}

function editarTarea(tarea) {
    console.log(`\nEstás editando la tarea ${tarea.titulo}.`);
    console.log("Deja en blanco para mantener el valor actual.");

    const desc = prompt("Descripción: ");
    if (desc !== "") tarea.descripcion = desc;

    const estado = prompt("Estado ([P]endiente/[E]n curso/[T]erminada/[C]ancelada): ");
    if (estado.toUpperCase() === "P") tarea.estado = ESTADOS.PENDIENTE;
    if (estado.toUpperCase() === "E") tarea.estado = ESTADOS.EN_CURSO;
    if (estado.toUpperCase() === "T") tarea.estado = ESTADOS.TERMINADA;
    if (estado.toUpperCase() === "C") tarea.estado = ESTADOS.CANCELADA;

    const dif = prompt("Dificultad (1/2/3): ");
    if (["1", "2", "3"].includes(dif)) tarea.dificultad = Number(dif);

    const fv = prompt("Vencimiento (YYYY-MM-DD): ");
    if (fv !== "") tarea.fechaVencimiento = new Date(fv);

    console.log("¡Datos guardados!");
}

// -------- PATH 2: BUSCAR ----------
function buscarTarea() {
    const clave = prompt("Introduce el título de una Tarea para buscarla: ");
    const resultados = tareas.filter(t => t.titulo.toLowerCase().includes(clave.toLowerCase()));
    if (resultados.length === 0) {
        console.log("No hay tareas relacionadas con la búsqueda.");
    } else {
        console.log("\nResultados:");
        resultados.forEach((t, i) => console.log(`[${i + 1}] ${t.titulo}`));
    }
}

// -------- PATH 3: CREAR ----------
function crearTarea() {
    console.log("\nEstás creando una nueva tarea.");
    const titulo = prompt("1. Ingresa el Título: ");
    const descripcion = prompt("2. Ingresa la descripción: ");
    const estado = prompt("3. Estado ([P]endiente/[E]n curso/[T]erminada/[C]ancelada): ");
    const dif = prompt("4. Dificultad (1/2/3): ");
    const fv = prompt("5. Vencimiento (YYYY-MM-DD): ");

    let estadoFinal = ESTADOS.PENDIENTE;
    if (estado.toUpperCase() === "E") estadoFinal = ESTADOS.EN_CURSO;
    if (estado.toUpperCase() === "T") estadoFinal = ESTADOS.TERMINADA;
    if (estado.toUpperCase() === "C") estadoFinal = ESTADOS.CANCELADA;

    const tarea = new Tarea(titulo, {
        descripcion: descripcion,
        estado: estadoFinal,
        dificultad: ["1", "2", "3"].includes(dif) ? Number(dif) : 1,
        fechaVencimiento: fv || null
    });

    tareas.push(tarea);
    console.log("¡Datos guardados!");
}

// -------- PROGRAMA PRINCIPAL --------
function main() {
    let salir = false;
    while (!salir) {
        mostrarMenuPrincipal();
        const opcion = prompt("> ");
        switch (opcion) {
            case "1": menuVerTareas(); break;
            case "2": buscarTarea(); break;
            case "3": crearTarea(); break;
            case "4": salir = true; break;
            default: console.log("Opción inválida");
        }
    }
}

// Iniciar
main();
