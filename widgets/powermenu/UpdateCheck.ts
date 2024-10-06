const Updates = Variable("...", {
  // only poll Updates every 12 hours
  poll: [1000 * 60 * 60 * 12, "bash -c 'yay -Qu | wc -l'"],
});

const UpdateCheck = () =>
  Widget.Label({
    label: Updates.bind().as((updateCount) => `Updates: ${updateCount}`),
    class_name: "update-check",
  });

export default UpdateCheck;
