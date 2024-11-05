import "@nativescript/macos-node-api";
import { Application } from "@nativescript/foundation";

await import("app").then((module) => {
  // Async import ensures that objc globals are defined when module is loaded.
  module.startApp();
  Application.launch();
});
