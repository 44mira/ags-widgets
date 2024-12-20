import Battery from "./side-info/Battery";
import Time from "./side-info/Time";
import Idle from "./side-info/Idle";
import Ram from "./side-info/Ram";
import Workspaces from "./Workspaces";
import Volume from "./side-info/Volume";
import Brightness from "./side-info/Brightness";

const hyprland = await Service.import("hyprland");

const FocusedTitle = () =>
  Widget.Label({
    class_name: "focused-title",
    truncate: "end",
    max_width_chars: 60,
  }).hook(hyprland.active.client, (self) => {
    self.label =
      hyprland.active.client.title !== ""
        ? hyprland.active.client.title.toString().trim()
        : " ";
  });

const SystrayToggleButton = (monitor: number) =>
  Widget.ToggleButton({
    class_name: "segment",
    css: "padding-left: 0.5em",
    child: Widget.Label("  "),
    on_toggled: (self) => {
      App.toggleWindow(`systray${monitor}`);
      self.toggleClassName("toggled", self.active);
    },
  });

const VolumeAndBrightness = () =>
  Widget.Box({
    class_name: "segment",
    children: [Volume(), Widget.Label("  "), Brightness()],
  });

const SideInfo = (monitor: number) =>
  Widget.Box({
    class_name: "side-info",
    hpack: "end",
    spacing: 8,
    children: [
      Idle(),
      Ram(),
      Time(),
      VolumeAndBrightness(),
      SystrayToggleButton(monitor),
      Battery(),
    ],
  });

export default (monitor: number) =>
  Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      class_name: "centerbox-bar",
      start_widget: Widget.Box({
        spacing: 8,
        children: [Workspaces(), FocusedTitle()],
      }),
      end_widget: SideInfo(monitor),
    }),
  });
