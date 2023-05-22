/**
 * Script para organizar y renombrar archivos en encuestas de Limesurvey
 * Esta versión sirve para archivos cv y cartas de motivos (talleres y cursos del LAIS)
 * Requisitos:
 *  - Los archivos doc, docx, odt, pdf en un directorio ("inputDirectory")
 *  - El archivo csv exportado de Limesurvey (ID de respuesta, Nombre, Correo, Carta, CV) en directorio raiz
 * Resultado:
 *  - Un directorio ("outputDirectory") con subdirectorios para cartas y cv, con archivos renombrados por id y nombre
 */

const fs = require('fs') // filesystem library
const csv = require('csv-parser') // native csv parser

// Nombres de directorios y archivo csv (en directorio raiz)
const filenameCSV = 'results-survey.csv';
const inputDirectory = 'input';
const outputDirectory = 'output';
const outputSubdirectoryCartas = 'cartas';
const outputSubdirectoryCV = 'cv';

// Campos necesarios en archivo CSV exportado de Limesurvey
const idRespuesta = 'ID de la respuesta';
const nombreCompleto = 'Nombre completo';
const cartaMotivos = 'Carta de exposición de motivos';
const perfilCurricular = 'Currículum vitae';

// Estructuras auxiliares
const results = [];
const files = [];

// Guardar nombres de archivos originales
fs.readdirSync(inputDirectory).forEach(file => files.push(file));

// Leer cada registro/fila del archivo csv
fs.createReadStream(filenameCSV)
  .pipe(csv())
  .on('data', (data) => results.push(data)) // copiar la información original
  .on('end', () => {
    results.forEach(elem => {
      const cartaArray = JSON.parse(elem[cartaMotivos]); // separa información en la columna de cartas
      const perfilArray = JSON.parse(elem[perfilCurricular]); // separa información en la columna de cv
      const cartaName = decodeURI(cartaArray[0].name); // estandarizar texto (i.e., espacios o acentos)
      const perfilName = decodeURI(perfilArray[0].name); // estandarizar texto (i.e., espacios o acentos)

      // Información para monitoreo en terminal
      console.log(`${idRespuesta}: `, elem[idRespuesta]);
      console.log(`${nombreCompleto}: `, elem[nombreCompleto]);
      console.log(`${cartaMotivos}: `, cartaName);
      console.log(`${perfilCurricular}: `, perfilName);
      const filesInSystem = files.filter(element => RegExp(`^0{2,4}${elem[idRespuesta]}_`).test(element));
      console.log('Files in system: ', filesInSystem);
      console.log('\n');

      const cartaExtension = filesInSystem[0].match(/\..*$/); // determinar la extesión/formato del documento
      const cvExtension = filesInSystem[1].match(/\..*$/); // determinar la extesión/formato del documento

      // Copiar, ordenar y renombrar los documentos:
      // - outputDir
      //   - cartasDir
      //      - <id1>_<nombre1>.pdf
      //      - <id2>_<nombre2>.docx
      //      - ...
      //   - cvDir
      //      - <id1>_<nombre1>.odt
      //      - <id2>_<nombre2>.pdf
      //      - ...
      fs.copyFileSync(`${inputDirectory}/${filesInSystem[0]}`, `${outputDirectory}/${outputSubdirectoryCartas}/${elem[idRespuesta]}_${elem[nombreCompleto]}${cartaExtension}`);
      fs.copyFileSync(`${inputDirectory}/${filesInSystem[1]}`, `${outputDirectory}/${outputSubdirectoryCV}/${elem[idRespuesta]}_${elem[nombreCompleto]}${cvExtension}`);
    });
});
