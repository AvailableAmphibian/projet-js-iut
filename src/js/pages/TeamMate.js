export default class TeamMate {
    #lastname;
    #firstname;
    #nick;
    #picture;
    #favoriteGame;
    #favoriteGameSlug;
    #description;
    #descriptionButtonText;
    #contribution;

    constructor(data){
        this.#lastname=data.lastname;
        this.#firstname=data.firstname;
        this.#nick=data.nick;
        this.#picture=data.picture;
        this.#favoriteGame=data.favoriteGame;
        this.#favoriteGameSlug=data.favoriteGameSlug;
        this.#description=data.description;
        this.#descriptionButtonText=data.descriptionButtonText;
        this.#contribution=data.contribution;
    }

    render(){
        return `
            <div class="team-mate">
                <p>${this.#firstname} ${this.#lastname}</p>
               <img src="${this.#picture}" alt="${this.#firstname}'s picture" height="200px">
                <p>Pseudo : ${this.#nick}</p>
                <p>Jeu Favoris : ${this.#favoriteGame}</p>
                <p>Contribution : ${this.#contribution}</p>
                <br>
                <p><button class="btn btn-danger btnModalDescription" data-description="${this.#description}">${this.#descriptionButtonText}</button></p>
                <p><button class="btn btn-danger toGame" data-slug="${this.#favoriteGameSlug}">Pour aller à mon jeu favoris</button></p>
            </div>
        `;
    }


}