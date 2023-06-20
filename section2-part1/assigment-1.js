const markWeight = 78;
const markTall = 1.69;

const jhonWeight = 92;
const jhonTall = 1.95;

const bmiMark = markWeight / markTall ** 2;
const bmiJhon = jhonWeight / (jhonTall * jhonTall);

console.info(bmiMark, bmiJhon);

const markHigherBMI =
  bmiJhon > bmiMark
    ? "BMI Jhon lebih besar dari BMI Mark"
    : "BMI Mark lebih besar dari BMI Jhon"; //coding challenge #2✅

console.info(markHigherBMI);

// Coding Challenge #1
// Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula:
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).
// Your tasks:
// 1. StoreMark'sandJohn'smassandheightinvariables
// 2. CalculateboththeirBMIsusingtheformula(youcanevenimplementboth
// versions)
// 3. CreateaBooleanvariable'markHigherBMI'containinginformationabout
// whether Mark has a higher BMI than John.
// Test data:
// § Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
// § Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.
