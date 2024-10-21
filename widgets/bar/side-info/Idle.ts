import hypridle from "services/hypridle";

const IdleState = () =>
  Widget.Icon({ size: 20 }).hook(hypridle, (self) => {
    self.icon = `preferences-desktop-${!hypridle.is_active ? "display" : "screensaver"}-symbolic`;
  });

const Idle = () =>
  Widget.Button({
    class_name: "segment",
    child: IdleState(),
    tooltip_text: hypridle
      .bind("is_active")
      .as((is_active) => (is_active ? "Will idle" : "Won't idle")),
    setup: (self) =>
      self.hook(
        hypridle,
        (self) =>
          (self.on_clicked = () => (hypridle.is_active = !hypridle.is_active)),
      ),
  });

export default Idle;
