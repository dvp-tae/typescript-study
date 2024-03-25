/* 객체 타입을 교차시키면 각 객체의 속성을 모두 조합한 것이 교차 결과로 나옴 */
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  // Admin과 Employee의 속성 중 하나라도 없으면 에러 발생
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

/* 유니언 타입을 교차시키면 해당 타입들에 공통적으로 있는 타입이 교차됨*/
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; 

function add(a: number, b: number): number;   // 함수 오버로딩 => 선언한 함수 위에 인자의 타입과 반환 형의 타입만 지정하는 형태로 사용
function add(a: string, b: string): string;   // 함수 오버로딩을 사용하는 경우 => 타입스크립트가 스스로 반환 값 타입을 식별할 수 없는 경우에 사용
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
  // 유니언 타입의 유연성이란 이점을 유지하면서 런타임에 코드가 제대로 실행되도록 해줌 => 타입 가드 (typeof를 활용한 타입 가드)
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Max', 'Manu');
result.split(' ');

const fetchUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My own company' }
};

console.log(fetchUserData?.job?.title);   // 옵셔널 체이닝

const userInput = '안녕';

const storedData = userInput ?? 'DEFAULT';  // null 병합 연산자 -> 확인하려는 값이 null 이거나 undefined라면 그 때 'DEFAULT'를 사용 그렇지 않은 경우 들어온 값 그대로 사용

console.log(storedData);

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation (emp: UnknownEmployee) {
//   console.log('Name: ' + emp.name);
//   // typeof는 자바스크립트가 알고 있는 타입만 판별 가능 (string, number, boolean 등)
//   // emp의 type은 런타임에 object로만 판별하므로 해당 속성의 존재 유무를 판별해주지 못함
//   // 이런 경우 in 키워드를 활용한 타입 가드 사용
//   if ('privileges' in emp) {
//     console.log('Privileges: ' + emp.privileges);
//   }
//   if ('startDate' in emp) {
//     console.log('StartDate: ' + emp.startDate);
//   }
// }

// printEmployeeInformation(e1);
// printEmployeeInformation({name:'Manu', startDate: new Date()});

// class Car {
//   drive() {
//     console.log('Driving...');
//   }
// }

// class Truck {
//   drive() {
//     console.log('Driving...');
//   }

//   loadCargo(amount: number) {
//     console.log('Loading cargo...' + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();
//   // if ('loadCargo' in vehicle) {  // class에서도 in 키워드를 활용한 타입 가드 사용 가능
//   //   vehicle.loadCargo(1000);
//   // }
//   if (vehicle instanceof Truck) {  // class에서는 instanceof 키워드를 활용해 타입 가드를 만들 수 있음
//     vehicle.loadCargo(1000);
//   }
// }

// useVehicle(v1);
// useVehicle(v2);


// // 타입 가드의 특별한 종류 => 구별된 유니언
// // 각 객체에 type이라는 하나의 공통 속성을 추가했기 때문에 구별된 유니언 이라고 칭함
// interface Bird {
//   type: 'bird';    // 구별된 유니언
//   flyingSpeed: number;
// }

// interface Horse {
//   type: 'horse';   // 구별된 유니언
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch(animal.type) {
//     case 'bird':
//       speed = animal.flyingSpeed;
//       break;
//     case 'horse':
//       speed = animal.runningSpeed;
//       break;
//   }
//   console.log(`Moving at speed(${animal.type}): ` + speed);
// }

// moveAnimal({type: 'bird', flyingSpeed:10});
// moveAnimal({type: 'horse', runningSpeed:40});


// // 형 변환
// // 타입스크립트는 HTML 코드를 읽고 분석하지 않음
// // 따라서 DOM 구조를 단순히 HTMLElement로만 인식하게 됨
// // const paragraph = document.getElementById('message-output');
// // 특정 HTML 요소에 특화된 속성을 지원하지 않으므로 형 변환 작업이 필요
// // 1. <> 를 통해 형 변환
// // const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// // 2. as 키워드를 통해 형 변환
// // const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

// // ! 키워드를 사용하면 해당 객체가 절대 null이 아니라는 것을 보장 (개발자가 null이 아님을 확신할 수 있는 상황에서 사용)
// // 그렇지 않은 경우는 if문을 통해 해결

// const userInputElement = document.getElementById('user-input');  // 만약 이 구문에 형 변환을 하게 되면 타입스크립트에게 이것이 null이 아님을 알려주는 것과 같음
// if (userInputElement) {
//   (userInputElement as HTMLInputElement).value= 'Hi there!';                          // 따라서 null인지 아닌지 확신할 수 없는 상황에서는 형 변환을 속성을 이용하는 곳에서 해야 함
// }


// // 인덱스 타입
// interface ErrorContainer {
//   // id: string;             // 사전에 정의하는 속성 추가 가능 => 하지만 인덱스 타입을 사용하는 경우 string 타입만 가능
//   [prop: string]: string  // 해당 객체가 가질 속성의 갯수나 내용을 미리 알 수 없는 상황에 인덱스 타입을 사용 => [] 안에 속성명의 타입을 명시하고 오른편에 해당 속성에 값의 타입을 명시
// }

// const errorBag: ErrorContainer = {
//   email: 'Not a valid email!',
//   userName: 'Must start with a captial chracter!'
// };

// console.log(errorBag);