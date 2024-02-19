import { Preferences } from "@capacitor/preferences";

export const setPrefence = function (
  key: string,
  value: object | string | number
) {
  return Preferences.set({ key, value: JSON.stringify(value) });
};

export const getPrefence = function <T>(key: string) {
  return Preferences.get({ key }).then(({ value }) =>
    value ? (JSON.parse(value) as T) : undefined
  );
};

export const removePrefence = function (key: string) {
  return Preferences.remove({ key });
};
