type Combinable = number | string; // 타입 얼리어스 (사용자 지정 타입) // number | string -> 유니언 타입
type ConversionDescriptor = "as-number" | "as-text"; // 'as-number' | 'as-text' -> 리터럴 타입
function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  // if (resultConversion === 'as-number') {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
  return result;
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);

/*타입 별칭을 사용해 타입을 직접 생성할 수 있음 -> User 라는 타입을 생성한 예제*/
// type User = { name: string; age: number };
// const ul: User = { name: 'Max', age: 30};

// function greet(user: { name: string; age: number }) {
//   console.log('Hi, I am ' + user.name);
// }
// function isOlder(user: { name: string; age: number }, checkAge: number) {
//   return checkAge > user.age;
// }
// type User2 = { name: string; age: number };

// function greet_new(user: User2) {
//   console.log('Hi, I am' + user.name);
// }
// function isOlder_new(user: User2, checkAge: number) {
//   return checkAge > user.age;
// }

// const A = {
//   name: 'sth',
//   age: 25
// }
// greet_new(A);
// console.log(isOlder_new(A,26));
