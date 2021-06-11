import React, { createContext, useReducer, useContext, useRef, useEffect } from 'react';

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

var context = createContext({});

var Scene = function Scene(props) {
  var _useReducer = useReducer(reducer, initialState),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  return React.createElement(context.Provider, {
    value: {
      state: state,
      dispatch: dispatch
    }
  }, React.createElement(Stage, Object.assign({}, props)), props.children);
};

var Stage = function Stage(props) {
  var _useContext = useContext(context),
      state = _useContext.state,
      dispatch = _useContext.dispatch;

  var stageRef = useRef(null);
  var attributes = props.attribute || {};
  useEffect(function () {
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
  useEffect(function () {
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

  return React.createElement("canvas", {
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
  var _useContext = useContext(context),
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
  useEffect(function () {
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
    textBaseline: "top"
  };

  var _useContext = useContext(context),
      state = _useContext.state;

  var attributes = useAttributes(props, defaultAttributes);
  var text = props.content;
  useEffect(function () {
    renderText(state.context, attributes, text);
  }, [props.content]);
  return null;
}

function renderText(ctx, attributes, content) {
  ctx.font = attributes.font;
  ctx.fillStyle = attributes.fillStyle;
  ctx.textBaseline = attributes.textBaseline;
  ctx.textAlign = attributes.textAlign;
  attributes.width = attributes.width || ctx.measureText(Text).width;

  if (attributes.textAlign === "right") {
    attributes.left += attributes.width;
  }

  if (attributes.textAlign === "center") {
    attributes.left += attributes.width / 2;
  }

  ctx.fillText(content, attributes.left, attributes.top);

  if (!!attributes.border) {
    ctx.rect(attributes.left, attributes.top, attributes.width, attributes.height);
    ctx.stroke();
  }
}

function Image(props) {
  var _useContext = useContext(context),
      state = _useContext.state;

  var attributes = useAttributes(props, {});
  useEffect(function () {
    renderImage(state.context, attributes, props.src);
  }, [props.src]);
  return null;
}

function renderImage(ctx, attributes, src) {
  console.log(src, "image", !!attributes.border);

  if (!!attributes.border) {
    ctx.rect(attributes.left, attributes.top, attributes.width, attributes.height);
    ctx.stroke();
  }
}

export { Image, Scene, Text, context };
//# sourceMappingURL=index.modern.js.map
