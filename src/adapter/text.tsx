import { useContext, useEffect } from "react";
import { context } from "./scene";
import { Attribute } from "./types";
import useAttributes from "./useAttributes";

function Text(props: any) {
  const defaultAttributes: Attribute = {
    textAlign: "left",
    textBaseline: "top",
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
function renderText(ctx: any, attributes: any, content: any) {
  ctx.font = attributes.font;
  ctx.fillStyle = attributes.fillStyle;
  ctx.textBaseline = attributes.textBaseline;
  ctx.textAlign = attributes.textAlign;
  //let distText = attributes.filterText(ctx, attributes.text);
  attributes.width = attributes.width || ctx.measureText(Text).width;

  if (attributes.textAlign === "right") {
    attributes.left += attributes.width;
  }
  if (attributes.textAlign === "center") {
    attributes.left += attributes.width / 2;
  }
  ctx.fillText(content, attributes.left, attributes.top);

  if (!!attributes.border) {
    ctx.rect(
      attributes.left,
      attributes.top,
      attributes.width,
      attributes.height
    );
    ctx.stroke();
  }
}

export { Text, renderText };
