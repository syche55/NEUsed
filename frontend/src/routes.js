import About from "./About.jsx";
import NotFound from './NotFound.jsx';
import Discover from "./Discover.jsx";

const routes = [
    { path: '/discover', component: Discover },
    { path: '/about', component: About },
    { path: '*', component: NotFound },
];

export default routes;
