import { useContext, useEffect } from "react";
import { context } from "./scene";
import useAttributes from "./useAttributes";
import { Props, Attribute, Event } from "./types";

interface TextProps extends Props {
  content: string;
  event?: Event;
}

function Text(props: TextProps) {
  const defaultAttributes: Attribute = {
    textAlign: "left",
    textBaseline: "top",
    font: "25px Lato",
    fillStyle: "#fff",
  };

  const { state } = useContext(context);

  const attributes = useAttributes(props, defaultAttributes);
  const text = props.content;
  useEffect(() => {
    // state.context.font = attributes.font;
    // state.context.fillStyle = attributes.fillStyle;
    // state.context.textBaseline = attributes.textBaseline;
    // state.context.fillText(attributes.Text, attributes.left, attributes.top);

    renderText(state.context, attributes, text);
  }, [props.content]);

  return null;
}

/**
 *
 * @param {object} context
 * @param {object} attributes top left width height x y font fontSize fillStyle
 */
function renderText(
  ctx: CanvasRenderingContext2D,
  attributes: Required<Attribute>,
  content: string
): void {
  ctx.font = attributes.font;
  ctx.fillStyle = attributes.fillStyle;
  ctx.textBaseline = attributes.textBaseline;
  ctx.textAlign = attributes.textAlign;
  //let distText = attributes.filterText(ctx, attributes.text);
  attributes.width = attributes.width || ctx.measureText(content).width;

  if (attributes.textAlign === "right") {
    attributes.left += attributes.width;
  }
  if (attributes.textAlign === "center") {
    attributes.left += attributes.width / 2;
  }
  if (!!attributes.border) {
    ctx.rect(
      attributes.left,
      attributes.top,
      attributes.width,
      attributes.height
    );
    ctx.stroke();
  }
  ctx.fillText(content, attributes.left, attributes.top);
}

export { Text, renderText };
