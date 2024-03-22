/* unknown 타입 -> 타입이 아직 정해지지 않은 상황에서 사용*/
// let userInput: unknown;
// let userName: string;

// userInput = 5;
// userInput = 'Max';
// if (typeof userInput === 'string') { //모든 것을 허용하는 any와 비슷하나 if 조건문 등으로 타입이 확정되어야 기존 타입 변수에 저장 가능
//   userName = userInput;
// }

/*never 타입 -> 절대 반환 값을 생성하지 않음 */

// function generateError(message: string, code: number): never { // 오류를 검증하는 함수 로직에서 주로 사용
//   throw { message: message, errorCode: code }; // 이 부분에서 코드가 멈춤. 즉, 반환을 하지 않음
// }

// generateError('An error occurred!', 500);

// const result = generateError('An error occurred!', 500);
// console.log(result); // 따라서 이런 식으로 반환 문을 작성해도 아무것도 반환하지 않음