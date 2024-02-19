import "./app.css";
import "animate.css";
import App from "./App.svelte";
import { checkFolders, getKey } from "./functions/app";
import { setDebugMode } from "u-logger";
import { key, stateOut, stateIn, header } from "./stores/keys";
import { getStateIn, getStateOut } from "./services/libsodium";

setDebugMode(true, true);

// #region Intialize Svelte App
const app = new App({
  target: document.getElementById("app") as HTMLElement,
});
// #endregion

(async function () {
  // #region Folder Stracture Check
  await checkFolders();
  // #endregion

  // #region Intialize key
  const keyValue = await getKey.pLogger();
  key.set(keyValue);
  // #endregion
})();

export default app;
