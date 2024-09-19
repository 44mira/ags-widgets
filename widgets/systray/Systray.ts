const systemtray = await Service.import("systemtray");

const Systray = (monitor = 0) =>
  Widget.Window({
    name: `systray${monitor}`,
    class_name: "system-tray",
    anchor: ["top", "right"],
    exclusivity: "ignore",
    child: Widget.Scrollable({}),
  });

export default Systray;
