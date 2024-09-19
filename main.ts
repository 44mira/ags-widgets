import Bar from "./widgets/bar/Bar.js";

const css = "/tmp/ags/style.css";

App.config({
  style: css,
  windows: [Bar(0)],
});
