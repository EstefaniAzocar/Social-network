// Este es el punto de entrada de tu aplicacion

import {routes}  from "./lib/index.js"

window.addEventListener('popstate',(e)=>{
    root.innerHTML = ''
    const pageRender =  routes[window.location.pathname]()
    root.appendChild(pageRender) 

})


//lo movimos a authStatechange ... o si no teniamos un parpadeo por que esto se ejecutaba
//1 segundo despues auth avisaba si habia o no usuario y cambiaba o bloqueaba la ruta
//para evitar el parpadeo se muever a authStateChange

// onNavigate(window.location.pathname)