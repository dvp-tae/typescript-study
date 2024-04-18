// const userName = 'Max';
// // userName = 'Maxim';
// let age = 30;
// age= 29;

// const add = (a: number, b: number = 1) => a + b;

// // console.log(add(2,5));

// const printOut: (a: number | string) => void = output => console.log(output);

// const button = document.querySelector('button');

// if(button) {
//   button.addEventListener('click', event => console.log(event));
// }

// printOut(add(4));

const hobbies = ["Sports", "Cooking", "Driving", "Movie"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

console.log(activeHobbies);

const person = {
  firstName: "Max",
  age: 25,
};

const newPerson = { ...person };

const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};
const addedNumbers = add(5, 10, 2, 3.7);
// console.log(addedNumbers);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

// console.log(hobby1, hobby2, hobbies);

const { firstName: userName, age } = person;
console.log(userName, age);
