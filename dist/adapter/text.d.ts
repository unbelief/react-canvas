import { Props, Attribute, Event } from "./types";
interface TextProps extends Props {
    content: string;
    event?: Event;
}
declare function Text(props: TextProps): null;
/**
 *
 * @param {object} context
 * @param {object} attributes top left width height x y font fontSize fillStyle
 */
declare function renderText(ctx: CanvasRenderingContext2D, attributes: Required<Attribute>, content: string): void;
export { Text, renderText };
