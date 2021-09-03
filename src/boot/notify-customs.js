import { Notify } from "quasar";

Notify.registerType("toast", {
  classes: "notify-toast no-box-shadow",
  badgeStyle: "display: none",
  timeout: 3000
});

Notify.registerType("toast-error", {
  classes: "notify-toast error no-box-shadow",
  badgeStyle: "display: none",
  timeout: 3000
});

Notify.registerType("toast-warning", {
  classes: "notify-toast warning no-box-shadow",
  badgeStyle: "display: none",
  timeout: 3000
});
