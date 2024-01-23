define(function () {
  const internals = {
    handlers: {},
    elements: {},
  };

  const externals = {};

  internals.createButton = function () {
    return '<button id="start">START</button>';
  };

  externals.render = function () {
    internals.elements.app = $("#app");
    internals.elements.app.append(internals.createButton());
    

    $("#start").on("click", function () {
      window.location.hash = "#question";
     
    });

    

  };

  externals.bind = function (event, handler) {
    internals.handlers[event] = handler;
  };

  return externals;
});
