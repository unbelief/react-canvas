import {
  useContext,
  useEffect,
  // useEffect
} from "react";
import { context } from "./scene";
import useAttributes from "./useAttributes";
import { Props, Attribute, Event } from "./types";

interface TableProps extends Props {
  summary: Array<Object>;
  data: Array<Object>;
  event?: Event;
}

function Table(props: TableProps) {
  const { state } = useContext(context);
  const attributes = useAttributes(props);
  const { summary, data } = props;

  useEffect(() => {
    renderTable(state.context, attributes, summary, data);
    return;
  }, [summary, data]);

  return null;
}

/**
 *
 * @param {object} context
 * @param {object} attributes
 */
function renderTable(
  ctx: CanvasRenderingContext2D,
  attributes: Attribute,
  summary: Array<Object>,
  data: Array<Object>
): void {
  console.log(`renderTable`, summary, data);
  const { left, top, width, height, border } = attributes;
  if (left && top && width && height) {
    if (!!border) {
      ctx.rect(left, top, width, height);
      ctx.stroke();
    }
  } else {
    console.log(`renderImage<drawImage> arguments lost`);
  }
}

export { Table };
