import { Notify } from "quasar";

Notify.registerType("toast", {
  classes: "notify-toast no-box-shadow",
  timeout: 3000
});

Notify.registerType("toast-error", {
  classes: "notify-toast error no-box-shadow",
  timeout: 3000
});
