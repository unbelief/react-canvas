import { useContext, useEffect } from "react";
import { Attribute } from "./types";
import { context } from "./scene";

/**
 * attribute && event
 * @param {object} props
 * @param {string} type text/image
 */
export default function (props: any, attributes?: Attribute) {
  //   const { state, dispatch } = useContext(context);
  const { dispatch } = useContext(context);

  const defaultAttributes: Attribute = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    border: 0,
  };

  const attritube = Object.assign(
    {},
    defaultAttributes,
    attributes,
    props.attribute
  );

  const event = props.event || false;

  // if (!!event && !sourceEvents.includes(event.type))
  //   throw new Error("eventType not Support");

  let x, y, width, height;
  x = attritube.left;
  y = attritube.top;
  width = attritube.width;
  height = attritube.height;
  const rect = { x, y, width, height };
  useEffect(() => {
    dispatch({
      type: "update:shape",
      body: { rect, ...event },
    });
  }, []);
  return attritube;
}
