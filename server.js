const express = require('express');
const fs = require('fs');
const { executeFile, getOutput, cleanExit } = require('./utils/emoji_interpreter'); // Importar correctamente la función

const app = express();
const port = 3000;


app.use(express.json());

const srcMain = 'src/main.emoji';

app.post('/v1/api/test', (req, res) => {
  const number = req.body.number;

  // Reemplazar {numero} en el archivo programa.emoji con el valor recibido en la solicitud
  const thempalteCode = fs.readFileSync(srcMain, 'utf-8');
  const content = thempalteCode.replace('{number}', number);
  fs.writeFileSync('temp.emoji', content); // Escribes en un archivo temporal

  cleanExit();
  try {
    // Llamar a la función ejecutarArchivo para procesar el archivo .emoji
    executeFile('temp.emoji');

    // Obtener la salida después de la ejecución
    const resultado = getOutput();
    res.json({ result: resultado });
  } catch (err) {
    res.json({ result: `Error al ejecutar: ${err.message}` });
  }
  fs.unlinkSync('temp.emoji');
});

app.listen(port, () => {
  console.log(`API Express escuchando en http://localhost:${port}`);
});
