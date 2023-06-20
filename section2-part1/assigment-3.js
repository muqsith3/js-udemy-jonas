const dolpins = [96, 108, 89];
const koalas = [89, 91, 110];

// menghitung total dolpins
const sumDolpins = Math.round(
  dolpins.reduce((result, value) => result + value) / 3
);
console.info(`total gymnastic team dolpins adalah ${sumDolpins}`);

// menghitung total koalas
const sumKoalas = Math.round(
  koalas.reduce((result, value) => result + value) / 3
);
console.info(`total gymnastic team koalas adalah ${sumKoalas}`);

if (sumDolpins > sumKoalas && sumDolpins >= 100) {
  console.info(`team dolpins menang`);
} else if (sumDolpins === sumKoalas && sumDolpins >= 100 && sumKoalas >= 100) {
  console.info(`kedua team seri`);
} else if (sumDolpins < 100 && sumKoalas < 100) {
  console.info(`kedua team tidak memenuhi minimum score, maka kedua team seri`);
} else if (sumKoalas > sumDolpins && sumKoalas >= 100) {
  console.info(`team koala menang`);
}
