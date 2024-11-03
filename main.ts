import Bar from "./widgets/bar/Bar.js";
import Systray from "./widgets/systray/Systray";
import Powermenu from "widgets/powermenu/Powermenu";
import Cheatsheet from "widgets/cheatsheet/Cheatsheet";

const scss = App.configDir + "/styles/main.scss";
const css = "/tmp/ags/style.css";

Utils.exec(`sassc ${scss} ${css}`);
App.applyCss(css);

App.config({
  windows: [Bar(0), Systray(0), Powermenu(), Cheatsheet()],
});

// Autoreload css
Utils.monitorFile(`${App.configDir}/styles`, function () {
  Utils.exec(`sassc ${scss} ${css}`);
  App.resetCss();
  App.applyCss(css);
});
