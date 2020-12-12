import About from "./About.jsx";
import NotFound from './NotFound.jsx';
import Discover from "./Discover.jsx";
import Sell from './Sell';

const routes = [
    { path: '/discover/:category?', component: Discover },
    { path: '/about', component: About },
    { path: '/sell', component: Sell},
    { path: '*', component: NotFound },
];

export default routes;
