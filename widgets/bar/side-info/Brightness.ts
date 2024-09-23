import brightness from "services/brightness";

const BrightnessIcon = () =>
  Widget.Icon({
    size: 20,
    icon: "display-brightness-symbolic",
  });

const BrightnessValue = () =>
  Widget.Label({
    label: brightness.bind("screen").as((s) => `${Math.floor(s * 100)}%`),
  });

const Brightness = () =>
  Widget.Box({
    spacing: 4,
    children: [BrightnessIcon(), BrightnessValue()],
  });

export default Brightness;
