import { TrayItem } from "types/service/systemtray";

const systemtray = await Service.import("systemtray");

export const SystemTrayToggle = Variable(false);

const SystemTrayItem = (item: TrayItem) =>
  Widget.Button({
    child: Widget.Icon({ size: 30 }).bind("icon", item, "icon"),
    tooltipMarkup: item.bind("tooltip_markup"),
    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),
  });

const SystemTrayPanel = () =>
  Widget.Box({
    spacing: 6,
    class_name: "system-tray",
    homogeneous: true,
    children: systemtray.bind("items").as((item) => item.map(SystemTrayItem)),
  });

const Systray = (monitor = 0) =>
  Widget.Window({
    name: `systray${monitor}`,
    anchor: ["top", "right"],
    margins: [40, 115, 0, 0],
    exclusivity: "ignore",
    visible: SystemTrayToggle.bind(),
    child: SystemTrayPanel(),
  });

export default Systray;
