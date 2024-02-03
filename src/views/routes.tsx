import GorrilaGame from "./GorrilaGame/GorrilaGame"
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
        component: <GorrilaGame />,
    },
    // fallback route
    {
        name: '404',
        path: '*',
        component: <div>404</div>,
    },

]

export default routes