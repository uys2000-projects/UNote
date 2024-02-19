import {
  deleteSecretFile,
  readSecretFile,
  writeSecretFile,
} from "../../services/filesystem";

export const writeKey = async function (key: Uint8Array) {
  const bits: number[] = [];
  key.forEach((b) => bits.push(b));
  return writeSecretFile("key", JSON.stringify(bits));
};

export const readKey = async function () {
  try {
    const result = await readSecretFile("key");
    if (!result.data) return undefined;
    const data = JSON.parse(result.data as string) as number[];
    return new Uint8Array(data);
  } catch {
    return undefined;
  }
};

export const deleteKey = function () {
  return deleteSecretFile("key");
};
