import Home from "../pages/Home.svelte";
import Tasks from "../pages/Tasks.svelte";
import Notes from "../pages/Notes.svelte";
import Login from "../pages/Login.svelte";
import Create from "../pages/Create.svelte";
import Settings from "../pages/Settings.svelte";
import Error from "../pages/Error.svelte";
import Test from "../pages/Test.svelte";

export default [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Tasks",
    path: "/tasks",
    component: Tasks,
  },
  {
    name: "Notes",
    path: "/notes",
    component: Notes,
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
    name: "test",
    path: "/test",
    component: Test,
  },
  {
    name: "Error",
    path: "*",
    component: Error,
  },
];
