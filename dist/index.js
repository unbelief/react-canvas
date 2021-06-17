function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var initialState = {
  devicePixelRatio: 1,
  canvas: null,
  context: null,
  events: [],
  shapes: new Set()
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case "initialize":
      return Object.assign(state, action.state);

    case "update:shape":
      return _extends({}, state, {
        events: [].concat(state.events, [action.body.type]),
        shapes: state.shapes.add(action.body)
      });

    default:
      return state;
  }
};

var context = React.createContext({});

var Scene = function Scene(props) {
  console.log("render Scene");

  var _useReducer = React.useReducer(reducer, initialState),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  return React__default.createElement(context.Provider, {
    value: {
      state: state,
      dispatch: dispatch
    }
  }, React__default.createElement(Stage, Object.assign({}, props)), props.children);
};

var Stage = function Stage(props) {
  console.log("render Stage");

  var _useContext = React.useContext(context),
      state = _useContext.state,
      dispatch = _useContext.dispatch;

  var stageRef = React.useRef(null);
  var attributes = props.attribute || {};
  React.useEffect(function () {
    var canvas = stageRef.current;
    var devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = ~~canvas.clientWidth * devicePixelRatio;
    canvas.height = ~~canvas.clientHeight * devicePixelRatio;
    var context = canvas.getContext("2d");
    var state = {
      devicePixelRatio: devicePixelRatio,
      canvas: canvas,
      context: context
    };
    dispatch({
      type: "initialize",
      state: state
    });
  }, []);
  React.useEffect(function () {
    state.events.forEach(function (type) {
      state.canvas.addEventListener(type, stageHandle);
    });
    return function () {
      state.events.forEach(function (type) {
        state.canvas.removeEventListener(type, stageHandle);
      });
    };
  }, [state.events]);

  function stageHandle(e) {
    var node = e.target;

    var _node$getBoundingClie = node.getBoundingClientRect(),
        left = _node$getBoundingClie.left,
        top = _node$getBoundingClie.top;

    var originalX, originalY;
    var evtArgs = {
      originalEvent: e,
      type: event
    };

    if (isTouch(e)) {
      var _e$changedTouches$ = e.changedTouches[0],
          clientX = _e$changedTouches$.clientX,
          clientY = _e$changedTouches$.clientY;
      originalX = Math.round(clientX - left);
      originalY = Math.round(clientY - top);
    } else {
      originalX = Math.round(e.clientX - left);
      originalY = Math.round(e.clientY - top);
    }

    var x, y;
    x = state.devicePixelRatio * originalX;
    y = state.devicePixelRatio * originalY;
    Object.assign(evtArgs, {
      originalX: originalX,
      originalY: originalY
    }, {
      x: x,
      y: y
    });
    state.shapes.forEach(function (shape) {
      e.type === shape.type ? isInside({
        x: x,
        y: y
      }, shape.rect) ? shape.handle() : 0 : 0;
    });
    e.preventDefault();
  }

  function isTouch(e) {
    return e instanceof TouchEvent;
  }

  function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
  }

  return React__default.createElement("canvas", {
    ref: stageRef,
    style: attributes,
    onContextMenu: function onContextMenu(e) {
      e.preventDefault();
    },
    onMouseOver: function onMouseOver() {
      var canvas = stageRef.current;
      canvas.style.cursor = "pointer";
    },
    onMouseOut: function onMouseOut() {
      var canvas = stageRef.current;
      canvas.style.cursor = "default";
    }
  });
};

function useAttributes (props, attributes) {
  var _useContext = React.useContext(context),
      dispatch = _useContext.dispatch;

  var defaultAttributes = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    border: 0
  };
  var attritube = Object.assign({}, defaultAttributes, attributes, props.attribute);
  var event = props.event || false;
  var x, y, width, height;
  x = attritube.left;
  y = attritube.top;
  width = attritube.width;
  height = attritube.height;
  var rect = {
    x: x,
    y: y,
    width: width,
    height: height
  };
  React.useEffect(function () {
    dispatch({
      type: "update:shape",
      body: _extends({
        rect: rect
      }, event)
    });
  }, []);
  return attritube;
}

function Text(props) {
  var defaultAttributes = {
    textAlign: "left",
    textBaseline: "top",
    font: "25px Lato",
    fillStyle: "#fff"
  };

  var _useContext = React.useContext(context),
      state = _useContext.state;

  var attributes = useAttributes(props, defaultAttributes);
  var text = props.content;
  React.useEffect(function () {
    renderText(state.context, attributes, text);
  }, [props.content]);
  return null;
}

function renderText(ctx, attributes, content) {
  ctx.font = attributes.font;
  ctx.fillStyle = attributes.fillStyle;
  ctx.textBaseline = attributes.textBaseline;
  ctx.textAlign = attributes.textAlign;
  attributes.width = attributes.width || ctx.measureText(content).width;

  if (attributes.textAlign === "right") {
    attributes.left += attributes.width;
  }

  if (attributes.textAlign === "center") {
    attributes.left += attributes.width / 2;
  }

  if (!!attributes.border) {
    ctx.rect(attributes.left, attributes.top, attributes.width, attributes.height);
    ctx.stroke();
  }

  ctx.fillText(content, attributes.left, attributes.top);
}

function Image(props) {
  var _useContext = React.useContext(context),
      state = _useContext.state;

  var attributes = useAttributes(props);
  React.useEffect(function () {
    var image = document.createElement("img");
    image.addEventListener("load", function () {
      renderImage(state.context, attributes, image);
    });

    image.onerror = function (err) {
      console.log(err);
    };

    image.src = "" + props.src;
    return function () {
      image.onerror = null;
      image.removeEventListener("load", function () {});
    };
  }, [props.src]);
  return null;
}

function renderImage(ctx, attributes, image) {
  var left = attributes.left,
      top = attributes.top,
      width = attributes.width,
      height = attributes.height,
      border = attributes.border;

  if (left && top && width && height) {
    if (!!border) {
      ctx.rect(left, top, width, height);
      ctx.stroke();
    }

    ctx.drawImage(image, left, top, width, height);
  } else {
    console.log("renderImage<drawImage> arguments lost");
  }
}

function Table(props) {
  var _useContext = React.useContext(context),
      state = _useContext.state;

  var attributes = useAttributes(props);
  var summary = props.summary,
      data = props.data;
  React.useEffect(function () {
    renderTable(state.context, attributes, summary, data);
    return;
  }, [summary, data]);
  return null;
}

function renderTable(ctx, attributes, summary, data) {
  console.log("renderTable", summary, data);
  var left = attributes.left,
      top = attributes.top,
      width = attributes.width,
      height = attributes.height,
      border = attributes.border;
  var rows = data.length + 1;
  var columns = summary.length;

  if (left && top && width && height) {
    var cellWidth = width / columns;
    var cellHeight = height / rows;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ccc";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    summary.forEach(function (s, i) {
      if (s.fillStyle) {
        ctx.fillStyle = s.fillStyle;
      }

      if (s.width) {
        ctx.fillText(s.displayName, cellWidth * i + cellWidth / 2 + left, top + cellHeight / 2.3);
      } else {
        ctx.fillText(s.displayName, cellWidth * i + cellWidth / 2 + left, top + cellHeight / 2.3);
      }
    });
    ctx.save();

    for (var r = 0; r < rows + 1; r++) {
      ctx.moveTo(0 + left, cellHeight * r + top);
      ctx.lineTo(width + left, cellHeight * r + top);
    }

    for (var c = 0; c < columns + 1; c++) {
      ctx.moveTo(cellWidth * c + left, 0 + top);
      ctx.lineTo(cellWidth * c + left, height + top);
    }

    ctx.stroke();
    ctx.restore();
    data.forEach(function (d, i) {
      ctx.fillStyle = "#000000";
      summary.forEach(function (s, index) {
        ctx.fillText(d[s.key], cellWidth * index + cellWidth / 2 + left, top + cellHeight * (i + 1) + cellHeight / 2.3);
      });
    });

    if (!!border) {
      ctx.rect(left, top, width, height);
      ctx.stroke();
    }
  } else {
    console.log("renderImage<drawImage> arguments lost");
  }
}

exports.Image = Image;
exports.Scene = Scene;
exports.Table = Table;
exports.Text = Text;
exports.context = context;
//# sourceMappingURL=index.js.map
