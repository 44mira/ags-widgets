const time = Variable(new Date(), {
  poll: [
    1000,
    () => {
      const now = new Date();

      return now;
    },
  ],
});

const Time = () =>
  Widget.Label({
    hpack: "center",
    class_name: "segment",
    label: time
      .bind()
      .as((now) => now.toLocaleDateString() + "  " + now.toLocaleTimeString()),
  });

export default Time;
