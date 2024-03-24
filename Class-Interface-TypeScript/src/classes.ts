abstract class Department {
  static fiscalYear = 2020;
  // private id: string;                 /*클래스 내에서 정의한 프로퍼티는 반드시 생성자에서 반복해서 초기화 하는 작업이 필요 -> 불필요한 코드 중복을 야기 */
  // private name: string;               
  protected employees: string[] = [];

  constructor(protected id: string, public name: string) {   /*코드 중복을 줄이기 위해 생성자 파라미터 내에서 한 번만 선언 */
    // this.id = id;
    // this.name = n;                    /*this 키워드는 해당 메소드를 호출한 객체를 참조함 */
  }

  static createEmployee(name: string) {
    return {name: name};
  }

  // describe(this: Department) {        /*this를 통해 새로 만든 객체에서도 해당 클래스의 필드에 접근할 수 있도록 설정함*/
  //   console.log(`Department (${this.id}: ${this.name})`);
  // }
  abstract describe(this: Department): void;  /*추상화 메소드는 중괄호 없이 ; 으로 끝나게 설정 */

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
  
  describe() {
    console.log('IT Department - ID: ' +this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if(this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if(!value) {
      throw new Error('Please pass in a valid value');
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if(AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2',[]);
    return this.instance;
  }

  describe() {
    console.log('Accouting Department - ID: ' +this.id);
  }

  addEmployee(name: string) {
    if(name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1',['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');
// it.employees[2] = 'Anna'; /*클래스 내 필드에 직접 엑세스해 수정이 가능한 문제가 발생 -> 타입스크립트에서는 이를 해결하기 위해 필드에 private 키워드 사용*/

it.describe();
it.printEmployeeInformation();
console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();

accounting.mostRecentReport = 'Year End Report';

accounting.addReport('Something went wrong...');
accounting.addReport('Something went Right...');

console.log(accounting.mostRecentReport);

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = { name: 's', describe: accounting.describe };

// accountingCopy.describe();