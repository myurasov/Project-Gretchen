/**
 * ControlWindow
 *
 * Events: -
 *
 * @copyright 2013, Mikhail Yurasov
 */

var _ = require("lib/underscore");

var createControlWindow = function(options)
{
  var view;

  // default options
  options = _.defaults(options || {}, {});

  function init()
  {
    view = Ti.UI.createWindow({
      backgroundColor: "white",
      title: "Control"
    });

    createControls();
  }

  function createControls() {

    var tableView = Ti.UI.createTableView({
      style: Titanium.UI.iPhone.TableViewStyle.GROUPED
    });

    view.add(tableView);

    var rows = [];

    for (var name in app.sc.channels) {
      var channel = app.sc.channels[name];
      rows.push(createRow(channel));
    }

    tableView.setData(rows);
  }

  function createRow(channel) {

    var section = Ti.UI.createTableViewSection();

    var row1 = Ti.UI.createTableViewRow({
    });

    var row2 = Ti.UI.createTableViewRow({
    });

    section.add(row1);
    section.add(row2);

    var labelValue;

    row1.add(labelValue = Ti.UI.createLabel({
      text: channel.options.value,
      color: "#4c566c",
      textAlign: "right",
      right: 10,
      width: 100,
      height: 44
    }));

    row1.add(Ti.UI.createLabel({
      text: channel.options.name,
      textAlign: "left",
      left: 10,
      width: 100,
      height: 44,
      font: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold"
      }
    }));

    row1.add(Ti.UI.createLabel({
      text: channel.options.comment,
      textAlign: "center",
      left: 10,
      right: 10,
      height: 44,
      font: {
        fontSize: 14,
        fontFamily: "Helvetica"
      },
      color: "#888888"
    }));

    var slider;

    row2.add(slider = Ti.UI.createSlider({
      left: 10,
      right: 10,
      max: channel.options.max,
      min: channel.options.min,
      value: channel.options.value,
      height: 44
    }));

    //

    slider.addEventListener("change", function(e) {
      channel.setValue(Math.round(e.value));
      labelValue.text = Math.round(e.value);
    });

    //

    return section;
  }


  init();

  return view;
}

//

exports = {
  createControlWindow: createControlWindow
}