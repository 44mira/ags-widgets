import { Keybind, Section } from "./types";
import { Variable as Var } from "types/variable";

const parserPath = App.configDir + "/parseKeybindings.py";

const getJSON = () => Utils.exec(parserPath, (out) => JSON.parse(out));
const CheatsheetJSON: Var<Section[]> = Variable(getJSON());

// monitor keybindings for changes
Utils.monitorFile("~/.config/hypr/keybindings.conf", () =>
  CheatsheetJSON.setValue(getJSON()),
);

const CheatsheetContent = (column) => {
  const primary = "#4B5CA3";
  const accent = "#e97c63";

  let output = "";
  for (const section of column) {
    output += `\n<span size='large' color='${primary}'>${section.title}</span> ---- \n`;

    for (const keybind of section.keybinds) {
      output += "\n";
      if ("name" in keybind) {
        output += `<span color='${accent}'>${keybind.name}</span> `;
      }
      output += `<span >${keybind.keybind}</span>`;
    }

    output += "\n";
  }

  return Widget.Label({
    class_name: "content",
    label: output,
    wrap: true,
    useMarkup: true,
    max_width_chars: 72,
    vpack: "start",
  });
};

const CheatsheetColumns = () => {
  let children: Section[][] = [];
  const chunk_size = 4;
  const sections = CheatsheetJSON.value.length;

  for (let i = 0; i < sections / chunk_size; i++) {
    children.push(
      CheatsheetJSON.value.slice(i * chunk_size, i * chunk_size + chunk_size),
    );
  }

  return Widget.Box({
    children: children.map((sections) => CheatsheetContent(sections)),
    spacing: 50,
    vertical: false,
    hpack: "center",
  });
};

const CheatsheetPanel = () =>
  Widget.Scrollable({
    hscroll: "never",
    vscroll: "always",
    class_name: "panel",
    child: CheatsheetColumns(),
  });

const Cheatsheet = () =>
  Widget.Window({
    setup: (self) =>
      self.keybind("Escape", () => {
        App.closeWindow(`cheatsheet`);
      }),
    class_name: "cheatsheet-window",
    name: `cheatsheet`,
    margins: [30, 0, 0, 0],
    exclusivity: "ignore",
    keymode: "exclusive",
    visible: false,
    child: CheatsheetPanel(),
  });

export default Cheatsheet;
