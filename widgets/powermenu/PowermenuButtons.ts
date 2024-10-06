const PowermenuButton = (
  icon: string,
  label: string,
  onclick = "",
  class_name = "",
) => {
  const Button = () =>
    Widget.Button({
      child: Widget.Label({
        class_name: class_name,
        label: icon,
      }),
      on_clicked: () => Utils.exec(onclick),
    });

  const Label = () =>
    Widget.Label({
      css: "font-size: 24px; font-weight: bold",
      class_name: class_name,
      label: label,
    });

  return Widget.Box({
    class_name: "powermenu-button",
    vertical: true,
    hpack: "center",
    spacing: 12,
    children: [Button(), Label()],
  });
};

const PowermenuButtons = () =>
  Widget.Box({
    spacing: 32,
    hpack: "center",
    css: "margin-top: 61px",
    children: [
      PowermenuButton(" ", "Shutdown", "poweroff", "shutdown"),
      PowermenuButton("  ", "Reboot", "reboot"),
      PowermenuButton(" 󰍃 ", "Logout", "hyprctl dispatch exit"),
    ],
  });

export default PowermenuButtons;
