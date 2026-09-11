#!/usr/bin/env node
/**
 * format-grype-report.js
 *
 * Reformatea un reporte JSON de Grype (u otro JSON) que viene:
 *   - Codificado en UTF-16LE (con BOM), en vez de UTF-8.
 *   - "Pretty-printed" de forma inconsistente: los niveles superiores
 *     tienen saltos de línea, pero los arreglos/objetos internos están
 *     comprimidos en una sola línea larguísima.
 *
 * Uso:
 *   node format-grype-report.js <archivo-entrada.json> [archivo-salida.json]
 *
 * Si no se indica archivo de salida, se genera uno con el sufijo
 * ".formatted.json" junto al de entrada.
 */

const fs = require('fs');
const path = require('path');

function detectEncoding(buffer) {
  // BOM UTF-16 LE: FF FE
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
    return 'utf16le';
  }
  // BOM UTF-16 BE: FE FF (Node no soporta 'utf16be' nativo, se maneja aparte si hiciera falta)
  if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) {
    throw new Error('Se detectó UTF-16BE, que Node.js no soporta de forma nativa. Se requiere una conversión previa.');
  }
  // BOM UTF-8: EF BB BF
  if (buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
    return 'utf8-bom';
  }
  return 'utf8';
}

function readJsonSmart(inputPath) {
  const buffer = fs.readFileSync(inputPath);
  const encoding = detectEncoding(buffer);

  let text;
  switch (encoding) {
    case 'utf16le':
      // Node NO descarta el BOM automáticamente al usar 'utf16le',
      // así que se elimina manualmente si quedó al inicio del string.
      text = buffer.toString('utf16le').replace(/^\uFEFF/, '');
      break;
    case 'utf8-bom':
      text = buffer.toString('utf8').replace(/^\uFEFF/, '');
      break;
    default:
      text = buffer.toString('utf8');
  }

  console.log(`Codificación detectada: ${encoding}`);
  console.log(`Tamaño en disco: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);

  return JSON.parse(text);
}

function main() {
  const [, , inputArg, outputArg] = process.argv;

  if (!inputArg) {
    console.error('Uso: node format-grype-report.js <archivo-entrada.json> [archivo-salida.json]');
    process.exit(1);
  }

  const inputPath = path.resolve(inputArg);
  const outputPath = outputArg
    ? path.resolve(outputArg)
    : inputPath.replace(/\.json$/i, '') + '.formatted.json';

  if (!fs.existsSync(inputPath)) {
    console.error(`No se encontró el archivo: ${inputPath}`);
    process.exit(1);
  }

  console.log(`Leyendo: ${inputPath}`);
  const data = readJsonSmart(inputPath);

  console.log('Reformateando con indentación de 2 espacios...');
  // JSON.stringify con el 3er argumento en 2 coloca cada atributo y cada
  // elemento de arreglo en su propia línea, con indentación consistente.
  const formatted = JSON.stringify(data, null, 2);

  // Se escribe en UTF-8 estándar (sin BOM), que es lo más portable
  // y legible para editores, control de versiones (git), etc.
  fs.writeFileSync(outputPath, formatted, { encoding: 'utf8' });

  const outSizeMb = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
  console.log(`Archivo generado: ${outputPath}`);
  console.log(`Tamaño en disco: ${outSizeMb} MB`);
  console.log(`Total de líneas: ${formatted.split('\n').length}`);
}

main();

