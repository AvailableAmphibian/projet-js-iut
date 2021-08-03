export default class CardContent{
    #picture;
    #title;
    #content;
    #slug;

    constructor(picture, title, content, slug){
        this.#picture=picture;
        this.#title=title;
        this.#content=content;
        this.#slug=slug;
    }

    render(){
        return `
            <div class="square one">
              <img src="${this.#picture}" class="cover toGame" alt="Photo de ${this.#title}" style="padding-top:10px;" data-slug="${this.#slug}"/>
              <div class="text">
                <h5>${this.#title}</h5>
                ${this.#content}
              </div>
            </div>
        `;
    }
}