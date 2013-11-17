/**
 * MemoryWindow
 * @copyright 2013 Mikhail Yurasov <me@yurasov.me>
 */

var _ = require("lib/underscore");

var createMemoryWindow = function(options)
{
  var view;

  // default options
  options = _.defaults(options || {}, {});

  function init()
  {
    view = Ti.UI.createWindow({
      backgroundColor: "white",
      title: "Memory"
    });
  }

  init();

  return view;
}

//

exports = {
  createMemoryWindow: createMemoryWindow
}