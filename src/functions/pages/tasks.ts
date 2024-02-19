import _sodium from "libsodium-wrappers";
import { animateCssOnIn, animateCssOnOut } from "../../services/animateCSS.js";
import { readDir, readFile, writeFile } from "../../services/filesystem";
import { Task } from "../../types/task";
import {
  encrypt,
  decrypt,
  getStateOut,
  getStateIn,
} from "../../services/libsodium";
import { getPrefence, setPrefence } from "../../services/prefences";
import {
  stringFromUint8Array,
  uint8ArrayFromString,
} from "../../utils/encryption";
export const listenForAnimations = function () {
  var unObservers: (() => void)[] = [];
  const parent = document.querySelector(".home-page");
  document.querySelectorAll(".collapse").forEach((item) => {
    animateCssOnIn(item, "fadeIn", parent as Element).then((unObserver) =>
      unObservers.push(unObserver)
    );
    animateCssOnOut(item, "fadeOut", parent as Element).then((unObserver) =>
      unObservers.push(unObserver)
    );
  });
  return unObservers;
};

export const listenForAnimation = function (item: Element) {
  var unObservers: (() => void)[] = [];
  const parent = document.querySelector(".home-page");
  animateCssOnIn(item, "fadeIn", parent as Element).then((unObserver) =>
    unObservers.push(unObserver)
  );
  animateCssOnOut(item, "fadeOut", parent as Element).then((unObserver) =>
    unObservers.push(unObserver)
  );
  return unObservers;
};

export const readTasks = async function (
  rangeCallback: (length: number) => void,
  callback: (name: string) => Promise<void>
) {
  const readdirResult = await readDir("data/tasks/");
  rangeCallback(readdirResult.files.length);
  for (let i = 0; i < readdirResult.files.length; i++) {
    const fileInfo = readdirResult.files[i];
    if (fileInfo.type == "file") await callback(fileInfo.name);
  }
};

export const readTask = async function (index: string, key: Uint8Array) {
  const header = await getPrefence<string>(index);
  const stateIn = await getStateIn(key, uint8ArrayFromString(header as string));
  const data = await readFile("tasks/" + index);
  const [decrypted, tag] = await decrypt.pLogger(
    uint8ArrayFromString(data),
    stateIn
  );
  const task = JSON.parse(decrypted) as Task;
  return new Task(task.index, task.title, task.content, task.isDone);
};

export const saveTask = async function (task: Task, key: Uint8Array) {
  const [stateOut, header] = await getStateOut(key);
  await setPrefence(task.index.toString(), stringFromUint8Array(header));
  const encryptedTask = await encrypt(JSON.stringify(task), stateOut);
  await writeFile(
    "tasks/" + task.index.toString(),
    stringFromUint8Array(encryptedTask)
  );
};
