import { API_KEY, API_LINK_GAME, getPlatformsAsTag } from "../constants";
import DetailsOtherGames from "../components/DetailsOtherGames";
import { backgroundHelper, toGame } from "../main";
import { Page } from "./Page";

export default class GameDetailsPage extends Page{
  #slug;
  #game;
  #dlc;
  #screenshots;
  #favorite;
  #other_games;
  #parent_games;

  constructor(slug) {
    super();
    this.#slug = slug;
    this.queryGame();
    this.queryDLCs();
    this.queryScreenshots();
    this.queryOtherGames();
    this.queryParentGames();
  }

  //Method that fills the index
  render() {
    //Fills the background to be unique among other games
    this.changeBackground();

    //Creating the page content
    let content = `<div class="details-container-top">
            <div class="details-left">
              <img src="${this.#game.background_image}" alt="${this.#game.name}'s image" style="width: 18rem;margin-top: 10px;"><h1>${this.#game.name}</h1></img>
              <h4>Details</h4>
              <p><h5>Note</h5> ${this.#game.metacritic}</p>`;

    content += this.showGenres();
    content += this.showDevelopers();

    content += `
              <p><h5>Release date</h5> ${this.#game.released}</p>
              <p><h5>Platforms</h5> ${getPlatformsAsTag(this.#game.parent_platforms)}</p>
            <button class="btn btn-light"> Add to favorites</button>
            </div>
            <div class="details-right"><h4>Description</h4>${this.#game.description}</div>
            </div>
            <div class="details-container-bottom">`;

    content += this.showScreenshots();

    content += this.showRelatives();

    content += `</div></div>`;

    return content;
  }

  mount(element){
    super.mount(element);
    element.querySelectorAll('.toGame').forEach(game => game.addEventListener('click',event => {
      event.preventDefault();
      toGame(game.getAttribute("data-slug"));
    }))
  }

  //Query Region

  queryGame() {
    let gameDetails = undefined;
    $.ajax({
      url: `${API_LINK_GAME}/${this.#slug}`,
      data: {
        key: API_KEY
      },
      type: "get",
      dataType: "json",
      async: false,
      success: function(data) {
        gameDetails = data;
      }

    });
    this.#game = gameDetails;
  }

  queryScreenshots() {
    let screenshots = [];
    $.ajax({
      url: `${API_LINK_GAME}/${this.#slug}/screenshots`,
      data: {
        key: API_KEY
      },
      type: "get",
      dataType: "json",
      async: false,
      success: function(data) {
        const tmp = [];
        data.results.forEach(screenshot => tmp.push(screenshot));
        screenshots = tmp;
      }
    });
    this.#screenshots = screenshots;
  }

  queryDLCs() {
    let dlcInfos = [];

    $.ajax({
      url: `${API_LINK_GAME}/${this.#slug}/additions`,
      data: {
        key: API_KEY
      },
      type: "get",
      dataType: "json",
      async: false,
      success: function(data) {
        const tmp = [];
        data.results.forEach(dlc => tmp.push(dlc));
        dlcInfos = tmp;
      }
    });
    this.#dlc = dlcInfos;
  }

  /*Chercher dans un JSON si le jeu est en favoris*/
  isFavorite() {
    this.#favorite = false;
  }

  queryOtherGames() {
    let otherGames = [];

    $.ajax({
      url: `${API_LINK_GAME}/${this.#slug}/game-series`,
      data: {
        key: API_KEY
      },
      type: "get",
      dataType: "json",
      async: false,
      success: function(data) {
        const tmp = [];
        data.results.forEach(otherGame => tmp.push(otherGame));
        otherGames = tmp;
      }
    });

    this.#other_games = otherGames;
  }

  queryParentGames() {
    let parents = [];

    $.ajax({
      url: `${API_LINK_GAME}/${this.#slug}/parent-games`,
      data: {
        key: API_KEY
      },
      type: "get",
      dataType: "json",
      async: false,
      success: function(data) {
        const tmp = [];
        data.results.forEach(parent => tmp.push(parent));
        parents = tmp;
      }
    });

    this.#parent_games = parents;
  }

  //End of Query Region

  //Page filling helper region

  changeBackground() {
    if (this.#game.background !== undefined)
      backgroundHelper(`background-image: url("${this.#game.background}")`,true);
    else
      backgroundHelper(`background-image: url("${this.#game.background_image}")`,true);
  }

  showGenres() {
    let content = `
    <p><h5>Genres</h5>`;

    if (this.#game.genres.length !== 0)
      content += `${this.#game.genres[0].name}`;


    this.#game.genres.shift();
    this.#game.genres.forEach(genre => content += `, ${genre.name}`);

    content += "</p>";

    return content;
  }

  showDevelopers() {
    let content = `<p><h5>Developers</h5>`;
    if (this.#game.developers.length !== 0 && this.#game.developers[0].name !== undefined)
      content += `${this.#game.developers[0].name}`;
    else if (this.#game.publishers.length !== 0)
      content += `${this.#game.publishers[0].name}`;


    this.#game.developers.shift();
    this.#game.developers.forEach(developer => content += `, ${developer.name}`);

    content += ";</p>";

    return content;
  }

  showScreenshots() {
    let i = 1;

    let content = `
              <div class="details-left"><h4>Some screenshots</h4>`;
    this.#screenshots.forEach(screenshot => content += `
<img class=" card-img-top" src="${screenshot.image}" alt="${this.screenNumber(i++)} screenshot of ${this.#game.name}" style="width: 18rem;margin-top: 10px;"/>
`);
    content += `</div>`;

    return content;
  }

  screenNumber(i) {
    if (i === 1)
      return "1st";
    else if (i === 2)
      return "2nd";
    else if (i === 3)
      return "3rd";
    else
      return `${i}th`;
  }

  showRelatives() {
    let content = `<div class="details-right">`;

    content += this.handleParents();
    content += this.handleLicence();
    content += this.handleDLCs();

    content += "</div>";

    return content;
  }

  handleParents() {
    let content = "";

    if (this.#parent_games !== undefined && this.#parent_games.length !== 0) {
      content += `<h4>Other games of the licence</h4>`;
      this.#parent_games.forEach(parentGame => {
        content += new DetailsOtherGames(parentGame.background_image, parentGame.name, parentGame.slug).render();
      });
    }

    return content;
  }

  handleLicence() {
    let content = "";

    if (this.#other_games !== undefined && this.#other_games.length !== 0) {
      content += `<h4>Other games of the licence</h4>`;
      this.#other_games.forEach(otherGame => {
        content += new DetailsOtherGames(otherGame.background_image, otherGame.name, otherGame.slug).render();
      });
    }

    return content;
  }

  handleDLCs() {
    let content = "";

    if (this.#dlc !== undefined && this.#dlc.length !== 0) {
      content += `<h4>DLC</h4>`;
      this.#dlc.forEach(gameDLC => {
        content += new DetailsOtherGames(gameDLC.background_image, gameDLC.name, gameDLC.slug).render();
      });
    }

    return content;

  }

  //End of Page filling helper region
}