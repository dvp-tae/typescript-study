//Drag& & Drpo Interface

export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

// export type Draggble = {
//   dragStartHandler(event: DragEvent): void;
//   dragEndHandle(event: DragEvent): void;
// };

export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
