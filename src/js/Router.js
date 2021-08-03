import GameDetailsPage from "./pages/GameDetailsPage";

export default class Router{
    static titleElement;
    static contentElement;
    static #menuElement;

    static routes = [];
    
    static set menuElement(element){
        this.#menuElement = element;
        const links = element.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                this.navigate(event.target.getAttribute('href'));
            })
        });
    }
 
    static navigate(path, pushState = true){
        let route;
        if (path.startsWith('/detail-'))
            route = this.routes.find(route => route.path.startsWith('/detail-'));
        else
             route = this.routes.find(route => route.path === path);

        if (route){
            this.titleElement.innerHTML = `<h1>${route.title}</h1>`;
            this.contentElement.innerHTML = route.page.render();
            route.page.mount(this.contentElement);
            const menuLink = this.#menuElement.querySelector(`a[href="${route.path}"]`), prevActiveLink = this.#menuElement.querySelector('a.active');
            prevActiveLink?.classList.remove('active');
            menuLink?.classList.add('active');
            if (pushState){
                window.history.pushState(null, null, path);
            }
        }
    }

    static changeDetailsPathAndNavigate(slug,pushState = true){
        const route = this.routes.find(route => route.path.startsWith('/detail-'));
        route.path = `/detail-${slug}`;
        route.page = new GameDetailsPage(slug);
        this.navigate(`/detail-${slug}`,pushState);
    }
}