function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) { // 함수는 반환형으로 undefined 를 사용할 수 없음 (void는 가능)
  console.log('Result: ' + num);
}

function addAndHanlde(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
;}
/*함수가 아무것도 반환하지 않는 경우 반환형으로 void는 가능하나 undefined는 불가능
void -> 명시적으로 이 함수에 반환 구문이 없음을 알려줌
undefined -> 반환 구문이 있지만 아무것도 반환하지 않는다고 이해함

**타입스크립트 버전 5.1 부터는 반환이 없는 함수의 반환형으로 undefined 허용**
*/

printResult(add(5,12));

// let someValue: undefined; // 타입 스크립트에서 undefined 도 하나의 타입 (변수는 undefined 타입이 가능)

/* 함수의 타입 지정 */
/* 1. Function 으로 지정 */
// let combineValues: Function; // 타입스크립트는 Function이라는 타입을 지원

// combineValues = add;
// combineValues = printResult; // 원하는 function이 아닌 다른 function도 그냥 허용이 됨 -> 문제가 됨
// combineValues = 5; // any 타입의 변수이므로 number를 넣어도 컴파일이 됨 -> 문제가 됨

/* 2. 함수 타입을 사용 */
let combineValues: (a: number, b: number) => number; // 매개변수와 반환형의 타입을 지정

combineValues = add; // 타입에 맞는 함수 허용
// combineValues = printResult; // 타입에 맞지 않는 함수는 컴파일이 안됨

console.log(combineValues(8,8));

addAndHanlde(10, 20, (result) => {
  console.log(result);
});