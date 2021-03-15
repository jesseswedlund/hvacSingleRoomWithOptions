window.onload = function () {
  // function generateRandomData(len) {
  //   // generate some random data
  //   var points = [];
  //   var max = 0;
  //   var width = 800;
  //   var height = 640;

  //   while (len--) {
  //     var val = Math.floor(Math.random() * 100);
  //     max = Math.max(max, val);
  //     var point = {
  //       x: Math.floor(Math.random() * width),
  //       y: Math.floor(Math.random() * height),
  //       value: val,
  //     };
  //     points.push(point);
  //   }

  //   var data = { max: max, data: points };
  //   return data;
  // }

  const room = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const animationData = [];

  const turnOnHeat = (floorPlan) => {
    console.log("<<<<<<ORINGINAL ROOM>>>>>>", room);
    let points;
    let max = 3;
    let width = 400;
    let height = 400;

    let startPoints = [];
    floorPlan.forEach((row, i) => {
      row.forEach((cell, j) => {
        max = Math.max(max, cell);
        startPoints.push({ x: j * 40 + 20, y: i * 40 + 20, value: cell });
      });
    });
    animationData.push({ max: max, data: startPoints });

    //intitiate heat
    let firstPoints = [];
    for (let i = 0; i < floorPlan.length; i++) {
      for (let j = 0; j < floorPlan[0].length; j++) {
        if (floorPlan[i][j] === 2) {
          floorPlan[i + 1][j] = 3;
        }
        firstPoints.push({
          x: j * 40 + 20,
          y: i * 40 + 20,
          value: floorPlan[i][j],
        });
      }
    }
    animationData.push({ max: max, data: firstPoints });

    console.log("<<<<<<AFTER HEAT TURNED ON>>>>>>", room);

    //continue to heat until every locale is heated
    let cycles = 0;

    while (!floorPlan.every((row) => row.every((cell) => cell !== 0))) {
      heatingCycle(floorPlan);
      points = [];

      for (let i = 0; i < floorPlan.length; i++) {
        for (let j = 0; j < floorPlan[0].length; j++) {
          let val = floorPlan[i][j];
          max = Math.max(max, val);
          var point = {
            x: j * 40 + 20,
            y: i * 40 + 20,
            value: val,
          };
          points.push(point);
        }
      }
      cycles++;
      console.log(`<<<<<<AFTER CYCLE ${cycles}>>>>>>`, room);
      let data = { max: max, data: points };
      console.log(data);
      animationData.push(data);
    }

    let data = { max: max, data: points };
    return data;
  };

  const heatAdjacent = (location, floorPlan) => {
    let a = location[0];
    let b = location[1];

    if (floorPlan[a - 1][b] === 0) floorPlan[a - 1][b] = 3;
    if (floorPlan[a + 1][b] === 0) floorPlan[a + 1][b] = 3;
    if (floorPlan[a][b - 1] === 0) floorPlan[a][b - 1] = 3;
    if (floorPlan[a][b + 1] === 0) floorPlan[a][b + 1] = 3;

    return floorPlan;
  };

  const heatingCycle = (floorPlan) => {
    locationsToHeat = [];
    for (let i = 0; i < floorPlan.length; i++) {
      for (let j = 0; j < floorPlan[0].length; j++) {
        //if (floorPlan[i][j] === 2) continue //continue to heat
        if (floorPlan[i][j] === 3) locationsToHeat.push([i, j]);
      }
    }

    locationsToHeat.forEach((locale) => heatAdjacent(locale, floorPlan));

    return floorPlan;
  };

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
    minOpacity: 0,
    //blur: 0.75,
    gradient: {
      0: "indigo",
      0.35: "blue",
      0.55: "green",
      0.65: "yellow",
      0.75: "orange",
      1.0: "red",
    },
    // gradient: {
    //   // enter n keys between 0 and 1 here
    //   // for gradient color customization
    //   ".01": "purple",
    //   ".3": "blue",
    //   ".6": "orange",
    //   ".95": "red",
    // },
  });

  // initiates the heating ccyle and pushes data into animationData array of heatmap states
  turnOnHeat(room);

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
