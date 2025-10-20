Ejercicio 1: 
a. Generalización Simbólica: 
Instanciación: Se usa una función constructora (ej. function Tarea()) llamada con la palabra clave new.
Herencia/Delegación: La lógica y los métodos compartidos se adjuntan a la propiedad .prototype del constructor (ej. Tarea.prototype.método).
Cadena de Prototipos: La regla central es que un objeto delega la búsqueda de propiedades y métodos a su prototipo (__proto__) si no los encuentra localmente,
siguiendo una cadena hasta alcanzar null.
this: Dentro de un método de prototipo o constructor llamado con new, la palabra clave this siempre apunta a la instancia que está invocando el código.
b. 2. Creencias de los profesionales: ¿Qué características particulares del lenguaje se cree que sean "mejores" que en otros lenguajes?
Se cree que su sistema de objetos basado en prototipos es más flexible y dinámico que el de otros lenguajes. Se puede crear
y modificar objetos fácilmente, heredar comportamientos sin estructuras rígidas y mezclar distintos estilos de programación. Tinen mas libertad y rapidez
que ofrece el lenguaje, aunque requiere cuidado para mantener el código ordenado.
