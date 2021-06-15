import React, {
  CSSProperties,
  FC,
  useEffect,
  useRef,
  createContext,
  useReducer,
  useContext,
} from "react";
import { Props, EventType } from "./types";

interface State {
  devicePixelRatio: number;
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  events: Array<EventType>;
  shapes: Set<any>;
}

interface Action {
  type: string;
  body: {
    type: string;
    handle: () => void;
    rect?: { x: number; y: number; width: number; height: number };
    content?: string;
    src?: string;
  };
  state: State;
}

const initialState = {
  devicePixelRatio: 1,
  canvas: null,
  context: null,
  events: [],
  shapes: new Set(),
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "initialize":
      return Object.assign(state, action.state);
    case "update:shape":
      return {
        ...state,
        events: [...state.events, action.body.type],
        shapes: state.shapes.add(action.body),
      };
    default:
      return state;
  }
};

/**
 * provider context {text/image/path/label}
 */
interface ContextProps {
  state: string;
  dispatch: ({ type }: { type: string }) => void;
}
// React.Context<ContextProps>
const context: any = createContext({} as ContextProps);
/**
 * provider
 * @param {Function} props
 * @param {Object} attributes
 * @param {Array} event
 */
const Scene: FC<Props> = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <context.Provider value={{ state, dispatch }}>
      <Stage {...props} />
      {props.children}
    </context.Provider>
  );
};

/**
 * createCanvas
 * @param {object} props
 * @param {json} attributes
 */
const Stage: FC<Props> = (props: Props) => {
  const { state, dispatch } = useContext(context);
  const stageRef = useRef(null);
  const attributes = (props.attribute || {}) as CSSProperties;

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = stageRef.current;
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas!.width = ~~canvas!.clientWidth * devicePixelRatio;
    canvas!.height = ~~canvas!.clientHeight * devicePixelRatio;
    const context = canvas!.getContext("2d");
    const state = { devicePixelRatio, canvas, context };
    dispatch({ type: "initialize", state: state });
  }, []);

  useEffect(() => {
    state.events.forEach((type: string) => {
      state.canvas.addEventListener(type, stageHandle);
    });
    return () => {
      state.events.forEach((type: string) => {
        state.canvas.removeEventListener(type, stageHandle);
      });
    };
  }, [state.events]);

  function stageHandle(e: MouseEvent | TouchEvent): void {
    const node = e.target as HTMLElement;
    const { left, top } = node.getBoundingClientRect();
    let originalX, originalY;
    const evtArgs = {
      originalEvent: e,
      type: event,
    };
    if (isTouch(e)) {
      const { clientX, clientY } = (e as TouchEvent).changedTouches[0];
      originalX = Math.round(clientX - left);
      originalY = Math.round(clientY - top);
    } else {
      originalX = Math.round((e as MouseEvent).clientX - left);
      originalY = Math.round((e as MouseEvent).clientY - top);
    }
    let x: number, y: number;
    x = state.devicePixelRatio * originalX;
    y = state.devicePixelRatio * originalY;
    Object.assign(evtArgs, { originalX, originalY }, { x, y });
    state.shapes.forEach((shape: any) => {
      e.type === shape.type
        ? isInside({ x, y }, shape.rect)
          ? shape.handle()
          : 0
        : 0;
    });
    e.preventDefault();
  }

  // function isTouch(
  //   e: React.TouchEvent | React.MouseEvent
  // ): e is React.TouchEvent {
  //   return e.nativeEvent instanceof TouchEvent;
  // }

  function isTouch(e: MouseEvent | TouchEvent): Boolean {
    return e instanceof TouchEvent;
  }

  function isInside(
    pos: { x: number; y: number },
    rect: { x: number; y: number; width: number; height: number }
  ) {
    return (
      pos.x > rect.x &&
      pos.x < rect.x + rect.width &&
      pos.y < rect.y + rect.height &&
      pos.y > rect.y
    );
  }

  return (
    <canvas
      ref={stageRef}
      style={attributes}
      onContextMenu={(e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
      }}
      onMouseOver={() => {
        const canvas: HTMLCanvasElement | null = stageRef.current;
        canvas!.style.cursor = "pointer";
      }}
      onMouseOut={() => {
        const canvas: HTMLCanvasElement | null = stageRef.current;
        canvas!.style.cursor = "default";
      }}
    />
  );
};

export { Scene, context };
