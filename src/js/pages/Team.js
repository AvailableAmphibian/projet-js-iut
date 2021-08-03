import TeamMate from './TeamMate';
import { backgroundHelper, toGame } from "../main";
import ModalContent from "../components/ModalContent";
import { Page } from "./Page";
import Router from "../Router";

export default class Team extends Page{
    #equipe;
    
    constructor(){
        super();
        let equipe = [];
        $.ajax({
            url: "/src/json/team.json",
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data){
                equipe=data;
            }
        })
        this.#equipe=equipe;
    }

    render(){
        backgroundHelper(`background-image:url("./src/img/team-background.jpeg")`)

        let content=`<center><div class="container"><div class="justify-content-center justify-content-between team">`;
        this.#equipe.forEach(eleve => {
            content+= new TeamMate(eleve).render();
        });
        content+=`</div></div></center>`;
        return content;
    }

    mount(element) {
        super.mount(element);

        //Description modal
        element.querySelectorAll('.btnModalDescription').forEach(modal => modal.addEventListener('click',event => {
            event.preventDefault();
            new ModalContent("Description", modal.getAttribute("data-description")).affichageModal();
        }));

        //Go to favorite game button
        element.querySelectorAll('.toGame').forEach(gameButton => gameButton.addEventListener('click',event => {
            event.preventDefault();
            toGame(gameButton.getAttribute("data-slug"));

        }));
    }
}