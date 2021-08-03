export default class ModalContent{
    #title;
    #content;

    constructor(title, content){
        this.#title = title;
        this.#content = content;
    }

    affichageModal(){
        $(".modal-header").html(
            `
                <h5 class="modal-title">${this.#title}</h5>
                <button type="button" class="close" id="close" data-dismiss="modal" aria-label="Close"></button>
            `
        );

        $(".modal-body").html(
            `
                <p>
                    ${this.#content}
                </p>
            `
        );

        $(".modal-footer").html(
            `
            <button type="button" class="btn btn-secondary btn-sm close" id="close" data-dismiss="modal">Fermer</button>
            `
        );

        $(".modal").modal("show");
        
        return true;
    }

    
}
