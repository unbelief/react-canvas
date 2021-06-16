import { useContext, useEffect } from "react";
import { context } from "./scene";
import useAttributes from "./useAttributes";
import { Props, Attribute, Event } from "./types";
interface ImageProps extends Props {
  src: string;
  event?: Event;
}

function Image(props: ImageProps) {
  const { state } = useContext(context);
  const attributes = useAttributes(props);
  useEffect(() => {
    let image: HTMLImageElement = document.createElement("img");
    // image.setAttribute("crossOrigin", "anonymous");
    image.addEventListener("load", () => {
      renderImage(state.context, attributes, image);
    });
    image.onerror = (err) => {
      console.log(err);
    };
    // ?${+new Date()}
    image.src = `${props.src}`;
    return () => {
      image.onerror = null;
      image.removeEventListener("load", () => {});
    };
    // renderImage(state.context, attributes, props.src);
  }, [props.src]);

  return null;
}

function renderImage(
  ctx: CanvasRenderingContext2D,
  attributes: Attribute,
  image: HTMLImageElement
): void {
  const { left, top, width, height, border } = attributes;
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

export { Image, renderImage };
