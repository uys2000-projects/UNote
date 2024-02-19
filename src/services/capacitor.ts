import { Capacitor } from "@capacitor/core";

export const getPlatform = function () {
  return Capacitor.getPlatform();
};
