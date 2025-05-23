import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default {
    input: "src/index.ts",
    output: [
        { file: "dist/index.cjs.js", format: "cjs", sourcemap: true },
        { file: "dist/index.esm.js", format: "es", sourcemap: true },
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        json()
    ],
    external: ["react", "react-dom"], // Exclui React do bundle
};
