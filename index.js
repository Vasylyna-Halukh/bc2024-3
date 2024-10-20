const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .requiredOption('-i, --input <path>', 'шлях до файлу для читання')
  .option('-o, --output <path>', 'шлях до файлу для запису результату')
  .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

let data;
try {
  data = fs.readFileSync(options.input);
} catch (err) {
  console.error("Cannot find input file");
  process.exit(1);
}

const jsonData = JSON.parse(data);
let results = [];

// Припустимо, jsonData містить масив об'єктів, де кожен об'єкт має StockCode, ValCode, Attraction
jsonData.forEach(item => {
  if (item.StockCode && item.ValCode && item.Attraction) {
    results.push(`${item.StockCode}-${item.ValCode}-${item.Attraction}`);
  }
});

// Вивід результату
if (options.output) {
  fs.writeFileSync(options.output, results.join('\n'));
}

if (options.display) {
  console.log(results.join('\n'));
}

// Якщо не задано жодного необов'язкового параметра, програма нічого не виводить
