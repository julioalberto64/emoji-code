# Lenguaje de Programación Emoji

Este proyecto presenta un lenguaje de programación basado en emojis. Los emojis reemplazan los comandos tradicionales, lo que da lugar a un lenguaje visual y lúdico que es fácil de entender y usar.

## 1. Diseño de la Gramática (Gramática Emoji)

A continuación se define una tabla de equivalencias entre los emojis y los comandos comunes utilizados en lenguajes de programación tradicionales.

### Tabla de Equivalencias Emoji-Comando

| Emoji  | Significado                   | Ejemplo                             |
|--------|-------------------------------|-------------------------------------|
| 🧠     | Inicio del programa            | 🧠                                  |
| 🍺     | Declarar variable              | 🍺 x = 5                            |
| ➕     | Sumar                          | ➕ z = x y                          |
| ➖     | Restar                         | ➖ z = x y                          |
| ✍️     | Imprimir                       | ✍️ x                                |
| ❓     | Condición `if` simple          | ❓ x > y: seguido de bloque         |
| 🔁     | Bucle `while`                  | 🔁 x < 10: seguido de bloque        |
| 🧩     | Definir función                | 🧩 hola(nombre):                    |
| ▶️     | Ejecutar función               | ▶️ hola x                           |
| 🔚     | Fin del programa               | 🔚                                  |


## 2. ¿Cómo funciona?
El lenguaje Emoji sigue una estructura muy similar a los lenguajes de programación tradicionales, pero en lugar de palabras clave y operadores, se usan emojis. Aquí están las partes clave del programa:

🧠: Marca el inicio del programa.

🍺: Se usa para declarar variables. Por ejemplo, 🍺 numero = 50212345678 declara una variable llamada numero y le asigna un valor.

🧩: Define una función. En el ejemplo, 🧩 verifica(p): define una función llamada verifica que toma un parámetro p.

❓: Es una instrucción condicional if. En el ejemplo, ❓ p >= 5020000000: verifica si p es mayor o igual a 5020000000.

🔁: Es un bucle while. No se usa en el ejemplo, pero puedes usarlo para ejecutar un bloque de código repetidamente mientras se cumpla una condición.

✍️: Imprime el valor de una variable. Por ejemplo, ✍️ Es de Guatemala imprimirá "Es de Guatemala" en la consola.

▶️: Ejecuta una función. En el ejemplo, ▶️ verifica numero ejecuta la función verifica pasando numero como argumento.

🔚: Marca el final del programa.

## 3. Requisitos y Ejecución
Este lenguaje requiere un intérprete que pueda leer y ejecutar el código Emoji. El intérprete es un archivo JavaScript (emoji_interpreter.js) que lee el archivo de código y lo ejecuta según las reglas definidas en el lenguaje.

Para ejecutar el programa:

Asegúrate de tener Node.js instalado en tu sistema.

Instala las dependencias del proyecto:


npm install
Ejecuta el servidor que proporciona la API para procesar las solicitudes:


node server.js
Realiza una solicitud POST a la API con el número de teléfono a verificar:


Request:

curl -X POST http://localhost:3000/v1/api/test -H "Content-Type: application/json" -d '{"number": "50212345678"}'

La respuesta será el resultado de la ejecución del programa en la consola del servidor, indicando si el número pertenece o no a Guatemala.


Response:

{
    "result": [
        "Es de Guatemala"
    ]
}


## 4. Conclusión
Este lenguaje basado en emojis es una forma divertida de aprender los conceptos básicos de la programación y explorar nuevas formas de pensar sobre el código. Con solo un conjunto de emojis, puedes crear programas sencillos y comprensibles. ¡Diviértete creando con emojis!


## Autor
#### Nombre: Julio Morales
#### Email: me@juliomorales.dev

## Licencia
Este proyecto está bajo la Licencia GPL-2.0 license.

## 5. Ejemplo de Programa

Aquí te mostramos un ejemplo básico de cómo usar el lenguaje de programación Emoji:

```plaintext
🧠
🍺 numero = 50212345678

🧩 verifica(p):
  ❓ p >= 5020000000:
    ❓ p < 5030000000:
      ✍️ Es de Guatemala
    ❓ p >= 5030000000:
      ✍️ No es de Guatemala

▶️ verifica numero
🔚
