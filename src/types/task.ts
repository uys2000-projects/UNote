export class Task {
  index: number;
  title: string;
  content: string;
  isDone: boolean;
  constructor(index: number, title: string, content: string, isDone = false) {
    this.index = index;
    this.title = title;
    this.content = content;
    this.isDone = isDone;
  }
}
