// const RamUsage = Variable(0, {
//   poll: [
//     2000,
//     `free -h | awk '/Mem:/{print $2," ",$3}' | tr -d Gi`,
//     (out) => out.split(/\s+/),
//   ],
// });

const ram = Variable([], {
  poll: [
    2000,
    `free -h`,
    (out) =>
      out
        ?.split("\n")
        ?.find((line) => line.includes("Mem:"))
        ?.split(/\s+/)
        ?.splice(1, 2)
        .map((a: string) => a.replace(/Gi/, "")) ?? ["1", "1"],
  ],
});

const Ram = () =>
  Widget.Label({
    class_name: "segment",
    label: ram.bind().as(([total, usage]) => `${usage}/${total} GB`),
  });

export default Ram;
