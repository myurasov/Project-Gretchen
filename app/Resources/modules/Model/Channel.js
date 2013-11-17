/**
 * Events:
 *  update
 *
 * @copyright 2013, Mikhail Yurasov <me@yurasov.me>
 */

var _ = require("lib/underscore");
var EventsMixin = require("lib/mym/EventsMixin");

exports = function (options) {

  EventsMixin(this);

  var self = this;

  // default options
  self.options = _.defaults(options || {}, {
    name: '',
    comment: '',
    value: 1500,
    min: 500,
    max: 2500,
    input: 0
  });

  function init() {
    self.setValue(self.options.value);
  }

  self.setValue = function (value) {
    value = Math.min(options.max, value);
    value = Math.max(options.min, value);

    if (value != self.options.value) {
      self.options.value = value;
      self.fireEvent("update", {
        value: value
      });
    }
  }

  init();
}