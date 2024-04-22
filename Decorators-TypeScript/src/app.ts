/* 데코레이터 생성 방법 (@Logger 를 이용해 사용) */
// function Logger(constructor: Function) {
//   console.log("Logging...");
//   console.log(constructor);
// }

/* 데코레이터 팩토리 정의 (@Logger() 를 이용해 사용)*/
function Logger(logString: string) {
  console.log("LOGGER FACTORY"); // 실행 순서1
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

/* 데코레이터 함수의 생성 순서는 팩토리 함수를 정의한 순서대로 생성 */
/* 데코레이터 함수 실행 순서는 상향식(bottom-up)으로 진행 */

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY"); //실행 순서2
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      // 생성자 함수를 만들어 새 로직을 추가하기 위해 클래스를 만듦
      constructor(..._: any[]) {
        // _ 연산자 => 타입스크립트에게 인자가 들어오는 건 알리지만 필요하지 않음을 표시하는 연산자
        super();
        console.log("Rendering template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('LOGGING - PERSON')
@Logger("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);

// ---

// 프로퍼티에 데코레이터를 추가하면 2개의 인자가 들어옴
// 첫 번재 인자
// 인스턴스 프로퍼티 -> 타깃 인자로 생성된 객체의 프로토타입
// 정적 프로퍼티 -> 생성자
// 두 번째 인자
// 프로퍼티 이름

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target);
  console.log(propertyName);
}

// 접근자에 데코레이터 추가

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// 메서드에 데코레이터 추가

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// 파라미터에 데코레이터 추가

function Log4(target: any, name: string | Symbol, position: number) {
  // 파라미터에 데코레이터 추가할 때는 3번재 인자로 메소드 내 해당 파라미터 위치 정보 넣어줌
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log // 프로퍼티에 추가되는 데코레이터
  title: string;
  private _price: number;

  @Log2 // 접근자에 추가되는 데코레이터 (접근자 -> getter setter)
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price = should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3 // 메서드에 추가되는 데코레이터
  getPriceWithTax(@Log4 tax: number) {
    // 매개변수에 추가되는 데코레이터
    return this._price * (1 + tax);
  }
}

// const p1 = new Product('Book', 19);
// const p2 = new Product('Book 2', 29);

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // addEventListener 추가 시 this가 가리키는 것을 원본 함수로 bind하기 위한 데코레이터
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // 게터는 value 프로퍼티에 값을 반환하기 전에 실행할 부가 로직이 합쳐진 형태
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  mesage = "This works!";

  @AutoBind
  showMessage() {
    console.log(this.mesage);
  }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

// ---

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registerValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: [
      ...(registerValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: [
      ...(registerValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
      "limit",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registerValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
        case "limit":
          isValid = isValid && obj[prop] < 1000;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }

  console.log(createdCourse);
});
