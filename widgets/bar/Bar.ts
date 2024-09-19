import Battery from "./side-info/Battery";
import Time from "./side-info/Time";
import Workspaces from "./Workspaces";

const hyprland = await Service.import("hyprland");

const FocusedTitle = () =>
  Widget.Label({
    class_name: "focused-title",
  }).hook(hyprland.active.client, (self) => {
    self.label =
      hyprland.active.client.title !== ""
        ? hyprland.active.client.title.toString().trim()
        : " ";
  });

const SideInfo = () =>
  Widget.Box({
    class_name: "side-info",
    hpack: "end",
    spacing: 8,
    children: [Time(), Battery()],
  });

export default (monitor: number) =>
  Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      class_name: "centerbox-bar",
      start_widget: Workspaces(),
      center_widget: FocusedTitle(),
      end_widget: SideInfo(),
    }),
  });
