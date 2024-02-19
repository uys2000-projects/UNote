import { makeDir, readDir } from "../services/filesystem";
import { generetaKey } from "../services/libsodium";
import { readKey, writeKey } from "./common/secret";

export const getKey = async function () {
  const key = await readKey.pLogger();
  if (key != undefined) return key;
  const newKey = await generetaKey();
  writeKey(newKey);
  return newKey;
};

export const checkFolders = async function () {
  try {
    await readDir.pLogger("secrets");
  } catch {
    await makeDir.pLogger("secrets");
  }
  try {
    await readDir.pLogger("data/tasks");
  } catch {
    await makeDir.pLogger("data/tasks");
  }
  await Promise.all([async () => {}, async () => {}]);
};
