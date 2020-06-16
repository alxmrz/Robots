import Main from './components/Main'
import Game from './components/Game'
const NotFound = {template: '<h1>Not found template</h1>'}

const routes = [
    {
        path: '/dist/',
        component: Main
    },
    {
        'path': '/',
        'component': Main
    },
    {
        'path': '/dist/game/',
        'component': Game
    },

];

export default routes;