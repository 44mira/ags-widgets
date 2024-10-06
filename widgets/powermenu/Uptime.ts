const UptimeValue = Variable("0 hr", {
  // only poll per minute
  poll: [
    1000 * 60,
    "uptime -p",
    (out) => {
      return out
        .slice(3) // remove 'up'
        .replace(/hours?/, "hr")
        .replace(/minutes?/, "min");
    },
  ],
});

const Uptime = () =>
  Widget.Label({
    label: UptimeValue.bind().as((uptime) => `Uptime: ${uptime}`),
    class_name: "uptime",
  });

export default Uptime;
