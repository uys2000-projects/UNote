import router from "page";
import routes from "./routes";
import { page, params, route } from "../stores/router";

routes.forEach((r) => {
  router(
    r.path,
    (ctx, next) => {
      next();
    },
    () => {
      route.set(r.name);
      page.set(r.component);
    }
  );
});
router.start();
