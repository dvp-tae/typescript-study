// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number; // 인터페이스로 함수를 정의하려면 소괄호 안에 인수를 작성하고 화살표가 아닌 콜론을 사용하고 반환 타입을 작성
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string; // ?를 사용해 선택적 프로퍼티 만들수 있음
}

interface Greetable extends Named {
  // interface와 type얼리어스는 비슷하나 객체 구조를 지정하는 경우 주로 interface를 사용함
  // readonly name: string; //readonly 키워드를 사용해 한 번 지정하면 수정할 수 없도록 함
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string; // interface에서 readonly로 지정해두면 class에서 따로 지정하지 않아도 적용됨
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hi");
    }
  }
}

let user1: Greetable;

user1 = new Person();
// user1.name = 'Manu'; // interface에 name 프로퍼티가 readonly로 지정되어있기 때문에 변경 불가능

user1.greet("Hi there - I am");
console.log(user1);
