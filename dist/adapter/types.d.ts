declare enum EventType {
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
    onTransitionEnd = "transitionend"
}
interface Event {
    type: EventType;
    handler: () => void;
}
interface Attribute {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
    width?: number | string;
    height?: number | string;
    border?: number | string;
    textAlign?: string;
    textBaseline?: string;
}
interface Props {
    attribute?: Attribute;
    event?: Event;
    children?: undefined | object | Array<Object>;
}
export { EventType, Event, Attribute, Props };
