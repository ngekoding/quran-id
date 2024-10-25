import { Howl } from "howler";
import { EventBus } from "./event-bus";

export default class Player {
  playlist = null;
  index = 0;

  constructor(playlist) {
    // Clear previous listeners
    EventBus.$off();

    this.playlist = [];
    this.index = 0;
    playlist.forEach(track => {
      this.playlist.push({
        src: track.src,
        howl: null
      });
    });
  }

  play(index) {
    // Stop current
    this.stop();

    let sound;
    const soundIndex = typeof index === "number" ? index : this.index;
    const data = this.playlist[soundIndex];

    if (data.howl) {
      sound = data.howl;
    } else {
      sound = new Howl({
        src: data.src,
        html5: true,

        onplay: () => EventBus.$emit("player:play"),
        onload: () => EventBus.$emit("player:load"),
        onpause: () => EventBus.$emit("player:pause"),
        onstop: () => EventBus.$emit("player:stop"),
        onend: () => EventBus.$emit("player:end"),

        onplayerror: () => {
          this.playlist[soundIndex].howl = null;
        },

        onloaderror: () => {
          this.playlist[soundIndex].howl = null;
        }
      });

      this.playlist[soundIndex].howl = sound;
    }

    if (sound.state() === "unloaded") {
      sound.load();
      sound.on("load", () => sound.play());
    } else {
      sound.play();
    }

    this.index = soundIndex;
  }

  pause() {
    switch (this.playlist[this.index]?.howl?.state()) {
      case "loaded":
        this.playlist[this.index].howl.pause();
        break;
      case "loading":
        this.playlist[this.index].howl.unload();
        break;
    }
  }

  stop() {
    switch (this.playlist[this.index]?.howl?.state()) {
      case "loaded":
        this.playlist[this.index].howl.stop();
        break;
      case "loading":
        this.playlist[this.index].howl.unload();
        break;
    }
  }

  next() {
    this.play(this.index + 1);
  }
}
