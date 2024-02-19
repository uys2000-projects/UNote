import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.uys2000.unote",
  appName: "unote",
  webDir: "dist",
  server: {
    androidScheme: "https",
    url: "http://192.168.180.98:5173/",
    cleartext: true,
  },
};

export default config;
