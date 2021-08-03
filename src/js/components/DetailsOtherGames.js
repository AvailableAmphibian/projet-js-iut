export default class DetailsOtherGames {
  #picture;
  #gameName;
  #slug;

  constructor(picture, title, slug) {
    this.#picture = picture;
    this.#gameName = title;
    this.#slug = slug;
  }

  render() {
    return `
            <div class="dlc cover"  style="background-image: url('${this.#picture}');">
              <div class="text h5 toGame" data-slug="${this.#slug}">
                ${this.#gameName}
              </div>
            </div>
        `;
  }
}