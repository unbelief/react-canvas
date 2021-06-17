import React, { createContext, useReducer, useContext, useRef, useEffect } from 'react';

const initialState = {
  devicePixelRatio: 1,
  canvas: null,
  context: null,
  events: [],
  shapes: new Set()
};

const reducer = (state, action) => {
  switch (action.type) {
    case "initialize":
      return Object.assign(state, action.state);

    case "update:shape":
      return { ...state,
        events: [...state.events, action.body.type],
        shapes: state.shapes.add(action.body)
      };

    default:
      return state;
  }
};

const context = createContext({});

const Scene = props => {
  console.log(`render Scene`);
  const [state, dispatch] = useReducer(reducer, initialState);
  return React.createElement(context.Provider, {
    value: {
      state,
      dispatch
    }
  }, React.createElement(Stage, Object.assign({}, props)), props.children);
};

const Stage = props => {
  console.log(`render Stage`);
  const {
    state,
    dispatch
  } = useContext(context);
  const stageRef = useRef(null);
  const attributes = props.attribute || {};
  useEffect(() => {
    const canvas = stageRef.current;
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = ~~canvas.clientWidth * devicePixelRatio;
    canvas.height = ~~canvas.clientHeight * devicePixelRatio;
    const context = canvas.getContext("2d");
    const state = {
      devicePixelRatio,
      canvas,
      context
    };
    dispatch({
      type: "initialize",
      state: state
    });
  }, []);
  useEffect(() => {
    state.events.forEach(type => {
      state.canvas.addEventListener(type, stageHandle);
    });
    return () => {
      state.events.forEach(type => {
        state.canvas.removeEventListener(type, stageHandle);
      });
    };
  }, [state.events]);

  function stageHandle(e) {
    const node = e.target;
    const {
      left,
      top
    } = node.getBoundingClientRect();
    let originalX, originalY;
    const evtArgs = {
      originalEvent: e,
      type: event
    };

    if (isTouch(e)) {
      const {
        clientX,
        clientY
      } = e.changedTouches[0];
      originalX = Math.round(clientX - left);
      originalY = Math.round(clientY - top);
    } else {
      originalX = Math.round(e.clientX - left);
      originalY = Math.round(e.clientY - top);
    }

    let x, y;
    x = state.devicePixelRatio * originalX;
    y = state.devicePixelRatio * originalY;
    Object.assign(evtArgs, {
      originalX,
      originalY
    }, {
      x,
      y
    });
    state.shapes.forEach(shape => {
      e.type === shape.type ? isInside({
        x,
        y
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
    onContextMenu: e => {
      e.preventDefault();
    },
    onMouseOver: () => {
      const canvas = stageRef.current;
      canvas.style.cursor = "pointer";
    },
    onMouseOut: () => {
      const canvas = stageRef.current;
      canvas.style.cursor = "default";
    }
  });
};

function useAttributes (props, attributes) {
  const {
    dispatch
  } = useContext(context);
  const defaultAttributes = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    border: 0
  };
  const attritube = Object.assign({}, defaultAttributes, attributes, props.attribute);
  const event = props.event || false;
  let x, y, width, height;
  x = attritube.left;
  y = attritube.top;
  width = attritube.width;
  height = attritube.height;
  const rect = {
    x,
    y,
    width,
    height
  };
  useEffect(() => {
    dispatch({
      type: "update:shape",
      body: {
        rect,
        ...event
      }
    });
  }, []);
  return attritube;
}

function Text(props) {
  const defaultAttributes = {
    textAlign: "left",
    textBaseline: "top",
    font: "25px Lato",
    fillStyle: "#fff"
  };
  const {
    state
  } = useContext(context);
  const attributes = useAttributes(props, defaultAttributes);
  const text = props.content;
  useEffect(() => {
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
  const {
    state
  } = useContext(context);
  const attributes = useAttributes(props);
  useEffect(() => {
    let image = document.createElement("img");
    image.addEventListener("load", () => {
      renderImage(state.context, attributes, image);
    });

    image.onerror = err => {
      console.log(err);
    };

    image.src = `${props.src}`;
    return () => {
      image.onerror = null;
      image.removeEventListener("load", () => {});
    };
  }, [props.src]);
  return null;
}

function renderImage(ctx, attributes, image) {
  const {
    left,
    top,
    width,
    height,
    border
  } = attributes;

  if (left && top && width && height) {
    if (!!border) {
      ctx.rect(left, top, width, height);
      ctx.stroke();
    }

    ctx.drawImage(image, left, top, width, height);
  } else {
    console.log(`renderImage<drawImage> arguments lost`);
  }
}

function Table(props) {
  const {
    state
  } = useContext(context);
  const attributes = useAttributes(props);
  const {
    summary,
    data
  } = props;
  useEffect(() => {
    renderTable(state.context, attributes, summary, data);
    return;
  }, [summary, data]);
  return null;
}

function renderTable(ctx, attributes, summary, data) {
  console.log(`renderTable`, summary, data);
  const {
    left,
    top,
    width,
    height,
    border
  } = attributes;
  const rows = data.length + 1;
  const columns = summary.length;

  if (left && top && width && height) {
    let cellWidth = width / columns;
    let cellHeight = height / rows;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ccc";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    summary.forEach((s, i) => {
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

    for (let r = 0; r < rows + 1; r++) {
      ctx.moveTo(0 + left, cellHeight * r + top);
      ctx.lineTo(width + left, cellHeight * r + top);
    }

    for (let c = 0; c < columns + 1; c++) {
      ctx.moveTo(cellWidth * c + left, 0 + top);
      ctx.lineTo(cellWidth * c + left, height + top);
    }

    ctx.stroke();
    ctx.restore();
    data.forEach((d, i) => {
      ctx.fillStyle = "#000000";
      summary.forEach((s, index) => {
        ctx.fillText(d[s.key], cellWidth * index + cellWidth / 2 + left, top + cellHeight * (i + 1) + cellHeight / 2.3);
      });
    });

    if (!!border) {
      ctx.rect(left, top, width, height);
      ctx.stroke();
    }
  } else {
    console.log(`renderImage<drawImage> arguments lost`);
  }
}

export { Image, Scene, Table, Text, context };
//# sourceMappingURL=index.modern.js.map
