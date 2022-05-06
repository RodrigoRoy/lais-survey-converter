# Conversor de archivos adjuntos (Limesurvey)

Ordena y renombra los archivos adjuntos (usualmente carta de motivos y currículum vitae) del sistema de registros con software Limesurvey que utiliza el Laboratorio Audiovisual de Investigación Social (LAIS).

## Dependencias

- [NodeJS](https://nodejs.org)
    - [csv-parser](https://github.com/mafintosh/csv-parser)

## Instalar dependencias

```sh
npm install
```

## Agregar archivos

- `results-survey.csv` (incluye columnas ID, Nombre, Carta motivos y CV)
- `inputDir`
  - `file1.pdf`
  - `file2.docx`
  - `file3.odt`
  - `...`

## Convertir archivos

```sh
npm run convert
```

El directorio `/outputDir` tendrá los archivos organizados y renombrados de la siguiente manera:
- `outputDir`
  - `cartas`
     - `<id1>_<name1>.pdf`
     - `<id2>_<name2>.docx`
     - `<id3>_<name3>.odt`
     - `...`
  - `cv`
     - `<id1>_<name1>.odt`
     - `<id2>_<name2>.pdf`
     - `<id2>_<name2>.docx`
     - `...`

## Licencia

Este proyecto es software libre: puede ser redistribuido y/o modificado bajo los términos de **GNU General Public License v3.0** siempre y cuando se mantenga la misma licencia.
