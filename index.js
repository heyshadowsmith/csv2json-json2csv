const axios = require('axios')
const csv = require('csvtojson')
const fastcsv = require('fast-csv')
const fs = require('fs')
const api = "https://digimon-api.herokuapp.com/api/digimon"
const apiSource = true

if (apiSource) {
    importedData = await axios({
        method: 'get',
        url: api
    })
    .then(response => {
        return response.data
    })
} else {
    // The function that imports the CSV and returns a JSON array.
    async function importCsv(filePath) {
        return await csv().fromFile(filePath)
    }

    // The name of the CSV file you wish to import and convert to JSON.
    const importCsvFilePath = './currentDigimonList.csv'

    // Storing the new JSON array in an 'importedData' variable.
    const importedData = await importCsv(importCsvFilePath)
}

// What you want the exported CSV file name to be called.
const exportCsvFileName = 'newDigimonList'

// The function that creates and exports a new CSV file from a JSON array with the file name of your choosing.
function exportCsv(data, fileName) {
    const writeStream = fs.createWriteStream(`${fileName}.csv`)

    fastcsv
        .write(data, { headers: true })
        .pipe(writeStream)
}

// Exporting and creating a new CSV file from a JSON array with the file name of our choosing.
// UNCOMMENT THE CODE BELOW TO RUN THE EXPORT
// exportCsv(importedData, exportCsvFileName)