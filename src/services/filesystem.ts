import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const readDir = function (path: string) {
  return Filesystem.readdir({
    path: path,
    directory: Directory.Data,
  });
};
export const makeDir = function (path: string) {
  return Filesystem.mkdir({
    path: path,
    directory: Directory.Data,
    recursive: true,
  });
};
export const writeSecretFile = async (path: string, data: string) => {
  await Filesystem.writeFile({
    path: "secrets/" + path,
    data: data,
    directory: Directory.Data,
    encoding: Encoding.UTF8,
  });
};
export const readSecretFile = async (path: string) => {
  const contents = await Filesystem.readFile({
    path: "secrets/" + path,
    directory: Directory.Data,
    encoding: Encoding.UTF8,
  });
  return contents;
};

export const deleteSecretFile = async (path: string) => {
  await Filesystem.deleteFile({
    path: "secrets/" + path,
    directory: Directory.Data,
  });
};

export const writeFile = async (path: string, data: string) => {
  await Filesystem.writeFile({
    path: "data/" + path,
    data: data,
    directory: Directory.Data,
    encoding: Encoding.UTF8,
  });
};
export const readFile = async (path: string) => {
  const contents = await Filesystem.readFile({
    path: "data/" + path,
    directory: Directory.Data,
    encoding: Encoding.UTF8,
  });
  return contents.data as string;
};

export const deleteFile = async (path: string) => {
  await Filesystem.deleteFile({
    path: "data/" + path,
    directory: Directory.Data,
  });
};
