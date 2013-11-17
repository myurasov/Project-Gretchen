/**
 * Events:
 *
 * @copyright 2013, Mikhail Yurasov <me@yurasov.me>
 */

var _ = require("lib/underscore");
var EventsMixin = require("lib/mym/EventsMixin");

exports = function (options) {

  EventsMixin(this);

  var self = this;
  var command;

  self.channels = [];

  // default options
  self.options = _.defaults(options || {}, {
    singleCommandTime: 500,
    multiCommandTime: 1500,
    url: ''
  });

  function init() {
  }

  function createCommand(multi) {
    var time = multi ? self.options.multiCommandTime : self.options.singleCommandTime;
    var cmd = '';

    for (var i in self.channels) {
      var ch = self.channels[i];
      cmd += '#' + ch.options.input + 'p' + ch.options.value + ' ';
    }

    if (time) {
      cmd += 't' + time;
    }

    return cmd;
  }

  self.addChannel = function (channel) {
    self.channels[channel.options.name] = channel;

    channel.addEventListener("update", function(e) {
      self.send(false);
    });
  }

  self.start = function () {
    self.send(true);
  }

  var xhrRunning = false;

  function _sendCommand(command) {
    if (!xhrRunning) {
      xhrRunning = true;

      var xhr = Ti.Network.createHTTPClient();
      xhr.timeout = 1000; // 1s

      xhr.onload = function() {
        xhrRunning = false;
      }

      xhr.onerror = function() {
        xhrRunning = false;
      }

      xhr.open("POST", self.options.url, true);
      xhr.send({
        value: command
      });
    }
  }

  var sendCommand = _.throttle(_sendCommand, 250);

  self.send = function (multi) {
    var newCommand = createCommand(multi);

    if (command !== newCommand) {
      sendCommand(newCommand);
    }
  }


  init();
}