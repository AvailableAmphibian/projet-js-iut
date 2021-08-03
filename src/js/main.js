//Imports
import Router from "./Router";
import Team from "./pages/Team";
import Jeux from "./pages/Jeux";
import ModalContent from "./components/ModalContent";

//Variable contenant le contenu des pages
let listeJeux = new Jeux(); //<-- Page d'accueil
// let favoris = new Equipe(); //à changer
let equipe = new Team();  //<-- Page de l'équipe
let game_details;           //<-- Page de détails
//Partie qui gère le menu, les liens et le changement de contenu
Router.titleElement = document.querySelector(".pageTitle"); //Titre du bloc que l'on édite
Router.contentElement = document.querySelector(".pageContent"); //contenu de la page que l'on edit
Router.menuElement = document.querySelector(".mainMenu"); //notre menu

//Les différentes routes de notre page
Router.routes = [
  { path: "/", page: listeJeux, title: "Les jeux" },
  { path: "/detail-:slug", page: game_details, title: "Détail jeu" },
  // { path: "/mes-favoris", page: favoris, title: "Mes favoris" },
  { path: "/lequipe.fr", page: equipe, title: "L'équipe" }
];

//Permet de retourner en arrière ou en avant (historique)
window.onpopstate = () => {
  const url = document.location;

  if (url.pathname.startsWith("/detail")) {
    const slug = url.pathname.replace("/detail-", "");
    Router.changeDetailsPathAndNavigate(slug, false);
  } else
    Router.navigate(url.pathname, false);
};
window.onpopstate();

//Fermeture du modal
$(".modal").on("shown.bs.modal", function() {
  $(".close").on("click", function() {
    $(".modal").modal("hide");
  });
});

export function backgroundHelper(value, detailed = false) {
  const body = document.querySelector("body");
  if (detailed) {
    if (!body.classList.contains("detailed-body")) {
      body.classList.add("detailed-body");
    }
  } else {
    if (body.classList.contains("detailed-body")) {
      body.classList.remove("detailed-body");
    }
  }
  body.setAttribute("style", value);
}

export function toGame(slug){
  Router.changeDetailsPathAndNavigate(slug);
}