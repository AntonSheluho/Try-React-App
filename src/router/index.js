import About from "../pages/About";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

const privateRouter = [
    {path: 'about', component: <About/>},
    {path: 'posts', component: <Posts/>},
    {path: 'posts/:id', component: <PostIdPage/>},
]; 

const publicRouter = [
    {path: 'login', component: <Login/>}
]; 

export {
    privateRouter,
    publicRouter
}