const battery = await Service.import("battery");

const Battery = () => {
  const BatteryColor = (percent: number) => {
    switch (true) {
      case percent === 100:
        return "#36af24";
      case percent > 80:
        return "#b5eb3a";
      case percent > 60:
        return "#d6e935";
      case percent > 40:
        return "#ead83e";
      case percent > 20:
        return "#e98643";
      default:
        return "#c95c5b";
    }
  };

  const BatteryPercent = () =>
    Widget.Label().hook(battery, (self) => {
      self.label = `${battery.charging ? "󰂅 " : "󰂁 "}${battery.percent}%`;
    });

  const BatteryProgress = () =>
    Widget.CircularProgress({
      rounded: false,
      inverted: false,
      value: battery.bind("percent").as((p: number) => p / 100),
    }).hook(battery, (self) => {
      self.css =
        `font-size: 6px; min-width: 25px; min-height: 25px; color: ` +
        BatteryColor(battery.percent);
    });

  return Widget.Box({
    homogeneous: false,
    spacing: 5,
    class_name: "segment",
    children: [BatteryPercent(), BatteryProgress()],
  });
};

export default Battery;
