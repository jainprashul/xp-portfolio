import Game2048 from "./2048Game"
import Portfolio from "./Portfolio"

type Route = {
    name : string,
    path : string,
    component : React.ReactNode,
}

const routes : Route[] = [
    {
        name: 'Portfolio',
        path: '/',
        component: <Portfolio />,
    },
    {
        name: 'GorrillaGame',
        path: '/game',
        component: <div>Game</div>,
    }, 
    {
        name: "2048Game",
        path: "/2048game",
        component : <Game2048 />  
    },
    // fallback route
    {
        name: '404',
        path: '*',
        component: <div>404</div>,
    },

]

export default routes