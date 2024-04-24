//Component Base Class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string // 선택적 프로퍼티
  ) {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateId)!
    );
    this.hostElement = <T>document.getElementById(hostElementId)!;

    // importNode 함수 -> 첫 번째 인자로 들어온 DOM 포인터에 있는 HTML 코드에 참조 제공 , 두 번째 인자는 깊은 복사를 할지 안할지 결정
    const importedNode = document.importNode(
      this.templateElement.content, // 첫 번째 인자 -> DOM 포인터
      true // 두 번째 인자 -> 깊은 복사할 지 안할지 여부
    );
    this.element = <U>importedNode.firstElementChild;
    if (newElementId) {
      this.element.id = newElementId; // id 연산자를 통해 새 DOM 요소 추가할 수 있음
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
