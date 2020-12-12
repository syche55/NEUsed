import About from "./About.jsx";
import NotFound from './NotFound.jsx';
import Discover from "./Discover.jsx";
import Sell from './Sell';
import Edit from './components/Form/UpdateForm.jsx';

const routes = [
    { path: '/edit/:id', component: Edit },
    { path: '/discover/:category?', component: Discover },
    { path: '/about', component: About },
    { path: '/sell', component: Sell },
    { path: '*', component: NotFound },
];

export default routes;
