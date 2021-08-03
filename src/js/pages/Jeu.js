import CardContent from "../components/CardContent.js";
import { getPlatformsAsTag } from "../constants";

export default class Jeu {
  #name;
  #parent_platforms;
  #slug;
  #metacritic;
  #genres;
  #background_image;

  constructor(data) {
    this.#name = data.name;
    this.#slug = data.slug;
    this.#metacritic = data.metacritic;
    this.#genres = data.genres;
    this.#parent_platforms = data.parent_platforms;
    this.#background_image = data.background_image;
  }

  render() {
    const content = `
            <p>Note : ${this.#metacritic}</p>
            <p>${getPlatformsAsTag(this.#parent_platforms)}</p>
            <p>Genres : ${this.forEachGenre()}</p>
            <button class="btn btn-danger text-light toGame" style="position:absolute;bottom:0;right:0;" data-slug="${this.#slug}">→</button>
        `;
    return new CardContent(this.#background_image, this.#name, content, this.#slug).render();
  }

  forEachGenre(){
    let content = `${this.#genres[0].name}`;
    const first = this.#genres.shift();
    this.#genres.forEach(genre => content += `, ${genre.name}`);
    this.#genres.unshift(first);
    return content;
  }
}