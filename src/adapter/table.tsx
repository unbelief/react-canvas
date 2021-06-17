import {
  useContext,
  useEffect,
  // useEffect
} from "react";
import { context } from "./scene";
import useAttributes from "./useAttributes";
import { Props, Attribute, Event } from "./types";

// table header
interface Summary {
  displayName: string;
  key: string;
  width?: number;
  fillStyle?: string;
}

interface TableProps extends Props {
  summary: Array<Summary>;
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
  summary: Array<Summary>,
  data: Array<Object>
): void {
  console.log(`renderTable`, summary, data);
  const { left, top, width, height, border } = attributes;
  // calculate cell
  const rows = data.length + 1;
  const columns = summary.length;

  if (left && top && width && height) {
    // default width
    let cellWidth = width / columns;
    let cellHeight = height / rows;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ccc";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";

    summary.forEach((s, i) => {
      if (s.fillStyle) {
        ctx.fillStyle = s.fillStyle;
      }
      if (s.width) {
        ctx.fillText(
          s.displayName,
          cellWidth * i + cellWidth / 2 + left,
          top + cellHeight / 2.3
        );
      } else {
        ctx.fillText(
          s.displayName,
          cellWidth * i + cellWidth / 2 + left,
          top + cellHeight / 2.3
        );
      }
    });

    ctx.save();

    for (let r = 0; r < rows + 1; r++) {
      ctx.moveTo(0 + left, cellHeight * r + top);
      ctx.lineTo(width + left, cellHeight * r + top);
    }
    for (let c = 0; c < columns + 1; c++) {
      ctx.moveTo(cellWidth * c + left, 0 + top);
      ctx.lineTo(cellWidth * c + left, height + top);
    }

    ctx.stroke();
    ctx.restore();

    data.forEach((d, i) => {
      ctx.fillStyle = "#000000";
      summary.forEach((s, index) => {
        ctx.fillText(
          d[s.key],
          cellWidth * index + cellWidth / 2 + left,
          top + cellHeight * (i + 1) + cellHeight / 2.3
        );
      });
    });

    if (!!border) {
      ctx.rect(left, top, width, height);
      ctx.stroke();
    }
  } else {
    console.log(`renderImage<drawImage> arguments lost`);
  }
}

export { Table };
