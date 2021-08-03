import { API_KEY, API_LINK_GAME, API_LINK_GENRE, METACRITIC_BASE_QUERY, DATE_TODAY } from "../constants.js";

export default class Filtres{
    #content;

    constructor(){
        this.#content = `
            <div id="accordion">
                <div class="card text-light border border-danger rounded">
                    <div class="card-header btnFiltres">
                        <h5 class="mb-0">
                            <a data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Filtres
                            </a>
                        </h5>
                    </div>
                    
                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                            <form id="myForm"> 
                                <div class="form-group">
                                    ${this.recherche()}
                                    <br><center>Ou</center><br>
                                    ${this.genres()}
                                    <br>
                                    ${this.tries()}
                                    <br>
                                    <center>
                                        <button class="btn btn-danger btnRechercher" id="btnRechercher">Rechercher</button>
                                    </center>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(){
        return this.#content;
    }

    recherche(){
        let rechercheContent = "";

        rechercheContent+=
        `
            <label for="search">Recherche</label>
            <input id="search" name="search" class="form-control" placeholder="Nom du jeu recherché">
        `;

        return rechercheContent;
    }

    genres(){
        let genres=[];
        let genreContent="";
        let next;

        $.ajax({
            url : API_LINK_GENRE,
            data:{
                key: API_KEY,
            },
            type: "get",
            dataType: "json",
            async: false,
            success: function(data){
                genres = data.results;
                next=data.next;
            }
        });
        
        genreContent+=
        `
            <label for="genres">Genre</label>
            <select id="genres" name="genres" class="form-control">
                <option value="" Selected>Tous</option>
        `;

        genres.forEach(genre => {
            genreContent+=`<option value="${genre.slug}">${genre.name}</option>`
        });

        genreContent+=`</select>`;

        return genreContent;
    }

    tries(){
        const triesContent =  `
            <label for="ordering">Trier par</label>
            <select id="ordering" name="ordering" class="form-control">
                <option value="" Selected>Pertinance</option>
                <option value="-metacritic">Note metacritic</option>
                <option value="-created">Date dessendente</option>
            </select>
        `

        return triesContent;
    }
}