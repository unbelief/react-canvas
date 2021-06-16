import { Props, Attribute, Event } from "./types";
interface ImageProps extends Props {
    src: string;
    event?: Event;
}
declare function Image(props: ImageProps): null;
declare function renderImage(ctx: CanvasRenderingContext2D, attributes: Attribute, image: HTMLImageElement): void;
export { Image, renderImage };
