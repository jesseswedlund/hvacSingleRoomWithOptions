import {turnOnSimpleHeat} from "../src/singleRoomSimple";
import {turnOnComplexHeat} from "../src/singleRoomComplex";
import {turnOnHeatWithIntake} from "./singleRoomWithIntake"

window.onload = function () {
  let heatType = "basic"

  const animationData = [];

  function $(selector) {
    return document.querySelectorAll(selector);
  }

  function AnimationPlayer(options) {
    this.heatmap = options.heatmap;
    this.data = options.data;
    this.interval = null;
    this.animationSpeed = options.animationSpeed || 300;
    this.wrapperEl = options.wrapperEl;
    this.isPlaying = false;
    this.init();
  }

  AnimationPlayer.prototype = {
    init: function () {
      var dataLen = this.data.length;
      this.wrapperEl.innerHTML = "";
      var playButton = (this.playButton = document.createElement("button"));
      playButton.onclick = function () {
        if (this.isPlaying) {
          this.stop();
        } else {
          this.play();
        }
        this.isPlaying = !this.isPlaying;
      }.bind(this);
      playButton.innerText = "play";

      this.wrapperEl.appendChild(playButton);

      var events = document.createElement("div");
      events.className = "heatmap-timeline";
      events.innerHTML = '<div class="line"></div>';

      for (var i = 0; i < dataLen; i++) {
        var xOffset = (100 / (dataLen - 1)) * i;

        var ev = document.createElement("div");
        ev.className = "time-point";
        ev.style.left = xOffset + "%";

        ev.onclick = function (i) {
          return function () {
            this.isPlaying = false;
            this.stop();
            this.setFrame(i);
          }.bind(this);
        }.bind(this)(i);

        events.appendChild(ev);
      }
      this.wrapperEl.appendChild(events);
      this.setFrame(0);
    },
    play: function () {
      var dataLen = this.data.length;
      this.playButton.innerText = "pause";
      this.interval = setInterval(
        function () {
          this.setFrame(++this.currentFrame % dataLen);
        }.bind(this),
        this.animationSpeed
      );
    },
    stop: function () {
      clearInterval(this.interval);
      this.playButton.innerText = "play";
    },
    setFrame: function (frame) {
      this.currentFrame = frame;
      var snapshot = this.data[frame];
      this.heatmap.setData(snapshot);
      var timePoints = $(".heatmap-timeline .time-point");
      for (var i = 0; i < timePoints.length; i++) {
        timePoints[i].classList.remove("active");
      }
      timePoints[frame].classList.add("active");
    },
    setAnimationData: function (data) {
      this.isPlaying = false;
      this.stop();
      this.data = data;
      this.init();
    },
    setAnimationSpeed: function (speed) {
      this.isPlaying = false;
      this.stop();
      this.animationSpeed = speed;
    },
  };

  var heatmapInstance = h337.create({
    container: document.querySelector(".heatmap"),
    radius: 50,
    maxOpacity: 0.5,
    minOpacity: 0.25,
    blur: 0.75,
    gradient: {
      0: "indigo",
      0.35: "blue",
      0.55: "yellow",
      0.65: "orange",
      0.75: "red",
      1.0: "#8B0000",
    },
  });

  // initiates the simple heating ccyle and pushes data into animationData array of heatmap states
  //turnOnSimpleHeat(animationData);
  //turnOnComplexHeat(animationData)
  turnOnHeatWithIntake(animationData)

  var player = new AnimationPlayer({
    heatmap: heatmapInstance,
    wrapperEl: document.querySelector(".timeline-wrapper"),
    data: animationData,
    animationSpeed: 500,
  });

  var controlButtons = $(".trigger-refresh");
  for (var i = 0; i < controlButtons.length; i++) {
    controlButtons[i].onclick = function () {
      var fps = this.dataset.fps;
      player.setAnimationSpeed((1 / +fps) * 1000);
    };
  }
};
