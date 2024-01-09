import Home from "../pages/Home.svelte";
import About from "../pages/About.svelte";
import Login from "../pages/Login.svelte";
import Create from "../pages/Create.svelte";
import Settings from "../pages/Settings.svelte";
import Error from "../pages/Error.svelte";

export default [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "About",
    path: "/about",
    component: About,
  },
  {
    name: "Create",
    path: "/create",
    component: Create,
  },
  {
    name: "Settings",
    path: "/settings",
    component: Settings,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    name: "Error",
    path: "*",
    component: Error,
  },
];
