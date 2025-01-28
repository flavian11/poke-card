import summary from "rollup-plugin-summary";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";
import { litScss } from "rollup-plugin-scss-lit";
import url from "@rollup/plugin-url";

const COMPONENT_FOLDER = "component";
const COMPONENT_FILENAME = "component";

export default {
  input: "./dist/src/" + COMPONENT_FOLDER + "/" + COMPONENT_FILENAME + ".js",
  output: {
    file: "./dist/src/" + COMPONENT_FOLDER + "/" + COMPONENT_FILENAME + ".js",
    format: "esm",
  },
  onwarn(warning) {
    if (warning.code !== "THIS_IS_UNDEFINED") {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    copy({
      targets: [
        { src: "src/" + COMPONENT_FOLDER + "/assets", dest: "dist/src/" + COMPONENT_FOLDER + "/" },
        { src: "src/" + COMPONENT_FOLDER + "/*.scss", dest: "dist/src/" + COMPONENT_FOLDER + "/" },
      ],
      verbose: true,
    }),
    copy({
      targets: [{ src: "src/" + COMPONENT_FOLDER + "/*.scss", dest: "dist/src/" + COMPONENT_FOLDER + "/" }],
      verbose: true,
    }),
    replace({ "Reflect.decorate": "undefined", preventAssignment: true }),
    resolve(),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
    }),
    summary(),

    litScss(),
    url(),
  ],
};
