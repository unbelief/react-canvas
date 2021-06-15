enum EventType {
  onClick = "click",
  onContextMenu = "contextmenu",
  onDoubleClick = "dblclick",
  onDrag = "drag",
  onDragEnd = "dragend",
  onDragEnter = "dragenter",
  onDragExit = "dragexit",
  onDragLeave = "dragleave",
  onDragOver = "dragover",
  onDragStart = "dragstart",
  onDrop = "drop",
  onMouseDown = "mousedown",
  onMouseEnter = "mouseenter",
  onMouseLeave = "mouseleave",
  onMouseMove = "mousemove",
  onMouseOut = "mouseout",
  onMouseOver = "mouseover",
  onMouseUp = "mouseup",
  onTouchCancel = "touchcancel",
  onTouchEnd = "touchend",
  onTouchMove = "touchmove",
  onTouchStart = "touchstart",
  onScroll = "scroll",
  onAnimationStart = "animationstart",
  onAnimationEnd = "animationend",
  onAnimationIteration = "animation",
  onTransitionEnd = "transitionend",
}

interface Event {
  type: string;
  handle: () => void;
}

interface Attribute {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  width?: number;
  height?: number;
  border?: number | string | boolean;
  // text
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  font?: string;
  fillStyle?: string;
  // image
}

interface Props {
  attribute?: Attribute;
  event?: Event;
  children?: object | Array<Object>;
}

export { EventType, Event, Attribute, Props };
