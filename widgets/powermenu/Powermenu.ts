import UpdateCheck from "./UpdateCheck";
import Uptime from "./Uptime";
import PowermenuButtons from "./PowermenuButtons";

const PowermenuStatus = () =>
  Widget.Box({
    homogeneous: false,
    spacing: 8,
    children: [UpdateCheck(), Uptime()],
    hpack: "center",
  });

const PowermenuPanel = () =>
  Widget.Box({
    vertical: true,
    hpack: "center",
    vpack: "center",
    children: [PowermenuStatus(), PowermenuButtons()],
    class_name: "panel",
    css: "margin-top: 59px",
  });

const Powermenu = () =>
  Widget.Window({
    setup: (self) =>
      self.keybind("Escape", () => {
        App.closeWindow(`powermenu`);
      }),
    class_name: "powermenu-window",
    name: `powermenu`,
    margins: [30, 0, 0, 0],
    exclusivity: "ignore",
    keymode: "exclusive",
    visible: false,
    child: PowermenuPanel(),
  });

export default Powermenu;
