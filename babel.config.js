module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@assets": "./assets",
          "@presentation": "./src/presentation",
          "@core": "./src/core",
          "@domain": "./src/domain",
          "@data": "./src/data",
          "@di": "./src/di",
          "@hocs": "./src/presentation/hoc",
          "@hooks": "./src/presentation/hook",
          "@components": "./src/presentation/component",
          "@containers": "./src/presentation/container",
          "@shared-state": "./src/presentation/shared-state",
          "@resources": "./src/presentation/resource",
          "@storyboards": "./src/presentation/storyboard",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
