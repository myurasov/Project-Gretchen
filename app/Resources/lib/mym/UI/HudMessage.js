/**
 * HUD message
 * @copyright 2012, Mikhail Yurasov
 * @version 1.2
 */

var _ = require("lib/underscore");

var createHudMessage = function(args)
{
  var view;
  var hud;
  var darkBg;
  var titleLabel;
  var fakeLabel;
  var content;
  var padder;

  function init()
  {
    // Default args
    args = _.defaults(args || {}, {
      top: "auto",
      left: "auto",
      zIndex: 1,
      title: ""
    });

    view = Ti.UI.createView({
      backgroundColor: "transparent",
      top: 0,
      left: 0,
      height: Ti.UI.FILL,
      width: Ti.UI.FILL,
      zIndex: args.zIndex,
      opacity: 0
    });

    hud = Ti.UI.createView({
      top: args.top,
      left: args.left,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE,
      backgroundColor: "transparent"
    });

    view.add(hud);

    content = Ti.UI.createView({
      layout: "horizontal",
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    });
    //
    hud.add(content);

    content.add(darkBg = Ti.UI.createView({
      backgroundColor: "black",
      borderRadius: 16,
      opacity: 0.5,
      zIndex: args.zIndex + 1,
      width: Ti.UI.SIZE,
      height: 70,
      layout: "horizontal"
    }));
    //
    darkBg.add(fakeLabel = Ti.UI.createLabel({
      left: 70,
      text: "",
      font: {
        fontSize: 18,
        fontWeight: "bold"
      },
      opacity: 0
    }));
    //
    padder = Ti.UI.createView({
      width: 19
    });
    //
    darkBg.add(padder);

    var indicator = Ti.UI.createView({
      width: 70,
      height: 70,
      zIndex: args.zIndex + 2,
      left: "-100%"
    });
    //
    var spinner = Ti.UI.createActivityIndicator({ /* 37x37 */
      style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
    });
    //
    spinner.show();
    indicator.add(spinner);
    //
    content.add(indicator);

    titleLabel = Ti.UI.createLabel({
      text: "",
      color: "white",
      font: {
        fontSize: 18,
        fontWeight: "bold"
      },
      zIndex: args.zIndex + 2,
      opacity: 0.8
    });

    content.add(titleLabel);

    //

    setTitle(args.title);
  }

  function setTitle (title) {
    if (title !== undefined && title !== "") {
      titleLabel.text = title;
      fakeLabel.text = title;
      padder.width = 19;
    } else {
      padder.width = 0;
      titleLabel.text = "";
      fakeLabel.text = "";
    }
  }

  init();

  view.setTitle = setTitle;

  view.showHud = function(point)
  {
    if (point === undefined) {
      point = {
        x: args.left,
        y: args.top
      }
    }

    if (_.isNumber(point.x)) {
      point.x -= hud.rect.width / 2;
    }

    if (_.isNumber(point.y)) {
      point.y -= hud.rect.height / 2;
    }

    hud.updateLayout({
      left: point.x,
      top: point.y
    });

    view.show();

    view.animate({
      duration: 250,
      opacity: 1
    });
  }

  view.hideHud = function()
  {
    view.animate({
      opacity: 0,
      duration: 250
    }, function() {
      view.hide();
    });
  }

  return view;
}

//

exports = {
  createHudMessage: createHudMessage
};