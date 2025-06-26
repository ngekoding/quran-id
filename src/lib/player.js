import { Howl } from "howler";
import mitt from "mitt";

export default class Player {
  playlist = null;
  index = 0;
  emitter = mitt();

  constructor(playlist) {
    this.playlist = [];
    this.index = 0;
    playlist.forEach(track => {
      this.playlist.push({
        src: track.src,
        howl: null
      });
    });
  }

  on(event, handler) {
    this.emitter.on(event, handler);
  }

  off(event, handler) {
    this.emitter.off(event, handler);
  }

  emit(event, payload) {
    this.emitter.emit(event, payload);
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

        onplay: () => this.emit("play"),
        onload: () => this.emit("load"),
        onpause: () => this.emit("pause"),
        onstop: () => this.emit("stop"),
        onend: () => this.emit("end"),

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
