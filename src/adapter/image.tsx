import { useContext, useEffect } from "react";
import { context } from "./scene";
import useAttributes from "./useAttributes";
// import { Props } from "./types";
// interface Props {
//   src: string;
//   style?: any;
//   event?: any;
// }

function Image(props: any) {
  //   const { state, dispatch } = useContext(context);
  const { state } = useContext(context);
  const attributes = useAttributes(props, {});
  useEffect(() => {
    // let image = new Image();
    // image.setAttribute("crossOrigin", "anonymous");
    // image.onload = function() {
    //     renderImage(state.context, attributes);
    //     image.onload = null;
    //     image = null;
    // };
    // image.src = `${props.src}?${+new Date()}`;

    renderImage(state.context, attributes, props.src);
  }, [props.src]);

  return null;
}

function renderImage(ctx: any, attributes: any, src: any) {
  console.log(src, `image`, !!attributes.border);
  //ctx.drawImage(content, attributes.left, attributes.top, attributes.width, attributes.height);
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

export { Image, renderImage };
