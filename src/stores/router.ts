import type { SvelteComponent } from "svelte";
import { writable } from "svelte/store";

export const page = writable(null as null | typeof SvelteComponent);
export const route = writable("" as string);
export const params = writable({ id: "" } as object);
