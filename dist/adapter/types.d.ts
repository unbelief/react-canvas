declare type EventType = "click" | "dblclick" | "contextmenu" | "drag" | "drop" | "scroll" | "animation" | "transitionend";
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
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
    font?: string;
    fillStyle?: string;
}
interface Props {
    attribute?: Attribute;
    event?: Event;
    children?: object | Array<Object>;
}
export { EventType, Event, Attribute, Props };
