const fs = require('fs');

let variables = {};
let funciones = {};
let salida = '';
let salidaArray = [];

function cleanExit() {
    salida = '';
    salidaArray = [];
}

function getOutput() {
    return salidaArray;
}

function evaluarCondicion(cond) {
    cond = cond.replace(/🔗/g, '&&').replace(/🔀/g, '||');
    const replaced = cond.replace(/([a-zA-Z_][a-zA-Z0-9_]*)/g, match => {
        if (variables.hasOwnProperty(match)) return variables[match];
        return match;
    });
    try {
        return eval(replaced);
    } catch (e) {
        return false;
    }
}

function ejecutarBloque(bloque) {
    for (const linea of bloque) interpretar(linea.trim());
}

function interpretar(linea) {
    if (!linea || linea.startsWith('🧠') || linea.startsWith('🔚')) return;

    if (linea.startsWith('🍺')) {
        const expr = linea.slice(2).trim();
        const [nombre, valor] = expr.split('=').map(s => s.trim());
        variables[nombre] = isNaN(valor) ? valor.replace(/"/g, '') : parseFloat(valor);
    } else if (linea.startsWith('➕') || linea.startsWith('➖')) {
        const op = linea.startsWith('➕') ? '+' : '-';
        const expr = linea.slice(2).trim();
        const [nombre, operacion] = expr.split('=').map(s => s.trim());
        const [a, b] = operacion.split(' ').map(s => isNaN(s) ? variables[s] : parseFloat(s));
        variables[nombre] = op === '+' ? a + b : a - b;
    } else if (linea.startsWith('✍️')) {
        const contenido = linea.slice(2).trim();
        const valor = (variables[contenido] !== undefined ? variables[contenido] : contenido);
        salida += valor + '\n';
        salidaArray.push(valor);
    } else if (linea.startsWith('▶️')) {
        const llamada = linea.slice(2).trim();
        const fnNombre = llamada.match(/([a-zA-Z0-9_]+)/)[0];
        const argsStr = llamada.match(/\((.*)\)/);
        const args = argsStr ? argsStr[1].split(',').map(a => a.trim()) : llamada.split(' ').slice(1);
        const fn = funciones[fnNombre];
        if (fn) {
            fn.args.forEach((arg, i) => {
                variables[arg] = isNaN(args[i]) ? variables[args[i]] ?? args[i] : parseFloat(args[i]);
            });
            ejecutarBloque(fn.body);
        }
    }
}

function executeFile(file) {
    const lines = fs.readFileSync(file, 'utf-8').split('\n');
    let i = 0;
    while (i < lines.length) {
        let linea = lines[i].trim();

        if (linea.startsWith('🧩')) {
            const match = linea.match(/function\s+(\w+)\(([^)]*)\)/) || linea.match(/🧩\s*(\w+)\(([^)]*)\)/);
            const nombre = match[1];
            const args = match[2].split(',').map(s => s.trim());
            i++;
            const bloque = [];
            let braceCount = 1;
            if (lines[i].trim() === '{') i++;
            while (i < lines.length && braceCount > 0) {
                let current = lines[i].trim();
                if (current === '{') braceCount++;
                else if (current === '}') braceCount--;
                else bloque.push(current);
                i++;
            }
            funciones[nombre] = { args, body: bloque };
        } else if (linea.startsWith('❓')) {
            const cond = linea.match(/\((.*)\)/)[1];
            i++;
            const bloqueIf = [];
            if (lines[i].trim() === '{') i++;
            let braceCount = 1;
            while (i < lines.length && braceCount > 0) {
                const current = lines[i].trim();
                if (current === '{') braceCount++;
                else if (current === '}') braceCount--;
                else bloqueIf.push(current);
                i++;
            }
            let tieneElse = lines[i] && lines[i].trim().startsWith('↩️');
            let bloqueElse = [];
            if (tieneElse) {
                i++;
                if (lines[i].trim() === '{') i++;
                braceCount = 1;
                while (i < lines.length && braceCount > 0) {
                    const current = lines[i].trim();
                    if (current === '{') braceCount++;
                    else if (current === '}') braceCount--;
                    else bloqueElse.push(current);
                    i++;
                }
            }
            if (evaluarCondicion(cond)) ejecutarBloque(bloqueIf);
            else if (tieneElse) ejecutarBloque(bloqueElse);
        } else {
            interpretar(linea);
            i++;
        }
    }
    return salida;
}

module.exports = {
    executeFile,
    cleanExit,
    getOutput
};
