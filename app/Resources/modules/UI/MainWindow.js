/**
 * MainWindow
 *
 * Events:
 *
 * @copyright 2013, Mikhail Yurasov
 */

var _ = require("lib/underscore");
var ControlWindow = require("modules/UI/ControlWindow");
var MemoryWindow = require("modules/UI/MemoryWindow");

createMainWindow = function (options) {

  var view;
  var controlWindow;
  var memoryWindow;

  // default arguments
  options = _.defaults(options || {}, {});

  function init() {

    view = Ti.UI.createTabGroup({
      title: "roboArm"
    });

    controlWindow = ControlWindow.createControlWindow();

    view.addTab(Titanium.UI.createTab({
      title: "Control",
      icon: "images/156-controller.png",
      window: controlWindow
    }));

    //

    memoryWindow = MemoryWindow.createMemoryWindow();

    view.addTab(Titanium.UI.createTab({
      title: "Memory",
      icon: "images/165-glasses-3.png",
      window: memoryWindow
    }));

    //

    attachEvents();
  }

  function attachEvents() {
  }

  init();

  return view;
}

//

exports = {
  createMainWindow: createMainWindow
}