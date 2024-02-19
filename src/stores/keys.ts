import { writable } from "svelte/store";
import _sodium from "libsodium-wrappers";

export const key = writable(null as null | Uint8Array);
export const stateOut = writable(null as null | _sodium.StateAddress);
export const stateIn = writable(null as null | _sodium.StateAddress);
export const header = writable(null as null | Uint8Array);
