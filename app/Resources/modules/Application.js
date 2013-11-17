
var _ = require("lib/underscore");
var MainWindow = require("modules/UI/MainWindow");
var ElectricImpServoController = require("modules/Model/ElectricImpServoController");
var Channel = require("modules/Model/Channel");

exports = function () {

  var self = this;
  var mainWindow;

  function init() {
    // Model

    // servo controller
    self.sc = new ElectricImpServoController({
      url: "https://api.electricimp.com/v1/d6faf27000264aba/3014551656502ed8"
    });

    // channels

    self.sc.addChannel(new Channel({
      name: 'A',
      input: 5,
      value: 1500,
      comment: 'base rotation'
    }));

    self.sc.addChannel(new Channel({
      name: 'B',
      input: 6,
      value: 800,
      comment: 'joint 1'
    }));

    self.sc.addChannel(new Channel({
      name: 'C',
      input: 4,
      value: 300,
      comment: 'joint 2'
    }));

    self.sc.addChannel(new Channel({
      name: 'D',
      input: 3,
      value: 2500,
      comment: 'joint 3'
    }));

    self.sc.addChannel(new Channel({
      name: 'E',
      input: 2,
      min: 850,
      max: 1950,
      value: 1950,
      comment: 'claw rotation'
    }));

    self.sc.addChannel(new Channel({
      name: 'F',
      input: 1,
      min: 760,
      max: 1350,
      value: 1000,
      comment: 'claw'
    }));
  }

  self.start = function () {

    // UI

    mainWindow = MainWindow.createMainWindow();

    mainWindow.addEventListener("open", function(e) {
      self.sc.start();
    });

    mainWindow.open();
  }

  init();
};