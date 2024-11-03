export interface Keybind {
  name?: string;
  keybind: string;
}

export interface Section {
  title: string;
  keybinds: Keybind[];
}
