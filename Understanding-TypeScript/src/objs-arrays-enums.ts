// const person: {
//   name : string,
//   age: number
// } = {
//   name : 'sth',
//   age : 25
// };

// const person: {
//   name: string;
//   age: number;
//   hobbies : string[];
//   role: [number, string];
// } = {
//   name: 'sth',
//   age: 25,
//   hobbies : ['Sports', 'Cooking'],
//   role: [2, 'author'] // 이렇게 선언하면 두 개의 인자만 있어야 함(하지만 내부적으로 숫자 또는 문자열이 들어오면 상관 없게 됨 -> 오류 발생의 소지)
//   /*타입스크립트에는 tuple 이라는 타입이 존재. 배열이지만 고정 길이라는 특징이 있음.*/
// }
enum Role { ADMIN = 5, READ_ONLY = 100, AUTHOR = 200 };

const person = {
  name: 'sth',
  age: 25,
  hobbies : ['Sports', 'Cooking'],
  role: Role.ADMIN
}

// person.role.push('admin'); // role에는 두 개의 인자만 있어야 하는데 이를 알지 못해 push 할 수 있는 문제가 발생 -> 이는 tuple이 허용하는 일종의 예외 (타입스크립트가 이를 잡아내지 못함)
// person.role[1] = 10; // 타입을 지정해두지 않으면 role은 문자열 또는 숫자로 이루어지기 때문에 두 번째 인자를 숫자로 바꾸는 것이 가능
// person.role = [0, 'admin', 'user']; // 대신 tuple은 개수 제한은 가능. 두 개의 인자로만 구성하고 role에 하나의 인자를 더 넣으려고 한다면 오류 발생
/*
  몇 개의 값을 배열에 담을지 명확하고 각 값의 타입을 미리 알고 있다면
  tuple이 배열을 사용하는 것보다 데이터 타입과 입력 받는 데이터 타입을 더 명확하고 엄격하게 처리 가능
*/

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  // console.log(hobby.map()); !!!문자열에는 map 사용 불가 배열에만 map 사용 가능!!! -> 타입 스크립트를 사용하면 이런 오류를 근본적으로 발견 가능
}

if (person.role === Role.AUTHOR) {
  console.log('is author');
}