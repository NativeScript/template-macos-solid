import { createSignal } from "npm:solid-js";

export const [selectedView, setSelectedView] = createSignal(0);
export function changeToolbar(index: number) {
  setSelectedView(index);
}
