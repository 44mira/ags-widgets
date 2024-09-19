import { range } from "utils";

const hyprland = await Service.import("hyprland");

const Workspaces = () => {
  const activeWorkspace = hyprland.active.workspace.bind("id");

  const workspaces = range(9, 1).map((i) =>
    Widget.Button({
      label: `${i}`,
      on_clicked: () => hyprland.messageAsync(`dispatch workspace ${i}`),
      class_name: activeWorkspace.as(
        (active) => `${active === i ? "focused-workspace" : ""}`,
      ),
    }),
  );

  return Widget.Box({
    class_name: "workspaces",
    hpack: "start",
    spacing: 6,
    children: workspaces,
  });
};

export default Workspaces;
