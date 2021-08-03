import { API_KEY, API_LINK_GAME, DATE_TODAY, METACRITIC_BASE_QUERY } from "../constants";
import Jeu from "./Jeu";
import Filtres from "../components/Filtres";
import { backgroundHelper, toGame } from "../main";
import { Page } from "./Page";
import Router from "../Router";

export default class Jeux extends Page {
  #jeux;
  #next;
  #previous;

  constructor() {
    super();
    let jeux;
    let next;
    let previous;

    $.ajax({
      url: API_LINK_GAME,
      data: {
        key: API_KEY,
        page_size: 15,
        dates: `2020-01-01,${DATE_TODAY}`,
        metacritic: METACRITIC_BASE_QUERY
      },
      type: "get",
      dataType: "json",
      async: false,
      success: function(data) {
        jeux = data.results;
        next = data.next;
        previous = data.previous;
      }
    });
    this.#jeux = jeux;
    this.#next = next;
    this.#previous = previous;
  }

  render(filtered = false) {
    backgroundHelper("");
    document.querySelector("body").setAttribute("style", "");

    let content = `<div class="row">`;

    if (!filtered) {
      content += `
        <div class="col-2">${new Filtres().render()}</div>
          <div class="contentJeux col-9"><div class="container"><div class="center-block row justify-content-between">
      `;
    } else {
      content += `<div class="contentJeux"><div class="container"><div class="center-block row justify-content-between">`;
    }


    this.#jeux.forEach(jeu => {
      content += new Jeu(jeu).render();
    });
    content +=
      `
      </div></div><br><br>
      <center>
    `;


    content += this.buttonFiller(this.#previous,this.#next);


    content += `
      </center>
      <br>&nbsp;
      </div>
      </div>
    `;

    return content;
  }

  buttonFiller(previous, next) {
    let content = `
<button id="btnPrevious" class="btn btn-danger btnOtherGamesPage" data-url="${this.#previous}"`;
    if (previous == null)
      content += `style="display:none"`;
    content += `>Page précédente</button>
<button id="btnNext" class="btn btn-danger btnOtherGamesPage" data-url="${this.#next}"`;

    if (next == null)
      content += `style="display:none"`;

    content += `>Page suivante</button>
      `;
    return content;
  }

  nextAndPreviousRender(url) {
    let jeux;
    let next;
    let previous;

    $.ajax({
      url: url,
      type: "get",
      dataType: "json",
      async: false,
      success: function(data) {
        jeux = data.results;
        next = data.next;
        previous = data.previous;
      }
    });
    this.#jeux = jeux;
    this.#next = next;
    this.#previous = previous;

    document.querySelector(".contentJeux").innerHTML = this.render(true);
    this.mount(Router.contentElement);
  }

  recherche(fsearch, fgenres, fordering) {
    let jeux = [];
    let next;
    let previous;

    let fdata = {
      key: API_KEY,
      dates: `2020-01-01,${DATE_TODAY}`,
      metacritic: METACRITIC_BASE_QUERY,
      page_size: 15
    };

    if (fsearch != null && fsearch !== "") {
      fsearch = fsearch.toLowerCase();
      fsearch = fsearch.replace(/ /g, "-");
      $.ajax({

        url: `${API_LINK_GAME}/${fsearch}`,
        type: "get",
        dataType: "json",
        async: false,
        success: function(data) {
          jeux.push(data);
          next = data.next;
          previous = data.previous;
        }
      });
    } else {

      if (fgenres != null && fgenres !== "") {
        fdata["genres"] = fgenres;
      }

      if (fordering != null && fordering !== "") {
        fdata["ordering"] = fordering;
      }

      $.ajax({

        url: API_LINK_GAME,
        data: fdata,
        type: "get",
        dataType: "json",
        async: false,
        success: function(data) {
          jeux = data.results;
          next = data.next;
          previous = data.previous;
        }
      });
    }

    this.#jeux = jeux;
    this.#next = next;
    this.#previous = previous;
    document.querySelector(".contentJeux").innerHTML = this.render(true);
    this.mount(Router.contentElement);
  }

  mount(element) {
    super.mount(element);

    //Go to favorite game button
    element.querySelectorAll(".toGame").forEach(game => game.addEventListener("click", event => {
      event.preventDefault();
      toGame(game.getAttribute("data-slug"));
    }));

    //Application des filtres + requete
    element.querySelector(".btnRechercher").addEventListener("click", event => {
      event.preventDefault();
      this.recherche($("#search").val(), $("#genres").val(), $("#ordering").val());
    });

    //Affichage des filtres sous forme d'accordéon
    element.querySelector(".btnFiltres").addEventListener("click", event => {
      event.preventDefault();
      $("#collapseOne").collapse("toggle");
    });

    //Gere les changement de pages dans la liste des jeux
    this.setPageButtonsBehaviour();
  }

  setPageButtonsBehaviour(){
    super.getElement().querySelectorAll('.btnOtherGamesPage').forEach(btn => btn.addEventListener('click',event => {
      event.preventDefault();
      this.nextAndPreviousRender(btn.getAttribute("data-url"));
      window.top.window.scrollTo(0, 0);
    }))
  }
}