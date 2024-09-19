const entry = App.configDir + "/main.ts";
const outdir = "/tmp/ags/js";

const scss =  App.configDir + "/style.scss";
const css =  '/tmp/ags/style.css';

Utils.exec(`sassc ${scss} ${css}`)

try {
  await Utils.execAsync([
    "bun", "build", entry,
    "--outdir", outdir,
    "--external", "resource://*",
    "--external", "gi://*",
  ]);
  await import(`file://${outdir}/main.js`);
} catch (error) {
  console.error(error);
}

// Utils.monitorFile(
//     // directory that contains the scss files
//     scss,
//
//     // reload function
//     () => {
//         // compile, reset, apply
//         Utils.exec(`sassc ${scss} ${css}`)
//         App.resetCss()
//         App.applyCss(css)
//     },
// )
