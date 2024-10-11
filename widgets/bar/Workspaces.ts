import { range } from "lib/utils";

const hyprland = await Service.import("hyprland");

const Workspaces = () =>
  Widget.Box({
    setup: (self) => {
      const activeWorkspace = hyprland.active.workspace.bind("id");

      // Limit display to n workspaces
      const workspaces = range(9, 1).map((i) =>
        Widget.Button({
          label: `${i}`,
          on_clicked: () => hyprland.messageAsync(`dispatch workspace ${i}`),
          class_name: activeWorkspace.as(
            (active) => `${active === i ? "focused-workspace" : ""}`,
          ),
        }),
      );

      self.children = workspaces;

      // only display filled workspaces
      self.hook(hyprland, () =>
        self.children.forEach(
          (ws) =>
            // @ts-ignore
            (ws.visible = hyprland.workspaces.some(({ id }) => id == ws.label)),
        ),
      );
    },
    class_name: "workspaces",
    hpack: "start",
    spacing: 6,
  });
export default Workspaces;
