const fs = require("fs");
const path = require("path");
const filesDir = "./files";

const readDirAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

const readFileAsync = (filePath, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

const getNumbersFromString = (data) => {
  return data.match(/\d+/g)?.map(value => Number(value)) || [];
}

async function start() {
  try {
    let arrayNumbers = [];
    const files = await readDirAsync(filesDir);
    for (const filePath of files) {
      const dataFromFile = await readFileAsync(`files\\${filePath}`, 'utf8');
      const numbersFromFile = getNumbersFromString(dataFromFile);
      arrayNumbers = [...arrayNumbers, ...numbersFromFile];
    }
    if(arrayNumbers.length === 0) {
      throw new Error('');
    } else {
      const sum = arrayNumbers.reduce((acc, value) => {
        return acc + value
      },0);
      console.log(`The sum of the numbers in the files: ${sum}`);
    }
  } catch {
    console.log('No numbers for calculating');
  }
}

start();