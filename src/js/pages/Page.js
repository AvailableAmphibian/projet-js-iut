export class Page {
  #element;

  mount(element){
    this.#element = element;
    window.top.window.scrollTo(0, 0);
  }

  getElement(){
    return this.#element;
  }
}