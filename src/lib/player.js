import { Howl } from "howler";
import { EventBus } from "./event-bus";

export default class Player {
  playlist = null;
  index = 0;

  constructor(playlist) {
    this.playlist = [];
    playlist.forEach(track => {
      this.playlist.push({
        src: track.src,
        howl: track.howl ?? null
      });
    });
  }

  play(index) {
    let sound;
    let soundIndex = typeof index === "number" ? index : this.index;
    let data = this.playlist[soundIndex];

    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: data.src,
        html5: true,

        onplay: () => EventBus.$emit("player:play"),
        onload: () => EventBus.$emit("player:load"),
        onpause: () => EventBus.$emit("player:pause"),
        onstop: () => EventBus.$emit("player:stop"),
        onend: () => EventBus.$emit("player:end")
      });
    }

    sound.play();

    this.index = soundIndex;
  }

  pause() {
    let sound = this.playlist[this.index].howl;
    sound.pause();
  }

  stop() {
    let sound = this.playlist[this.index].howl;
    sound.stop();
  }

  next() {
    // Stop the current track
    if (this.playlist[this.index].howl) {
      this.playlist[this.index].howl.stop();
    }

    this.play(this.index + 1);
  }
}
