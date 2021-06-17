import { Props, Event } from "./types";
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
declare function Table(props: TableProps): null;
export { Table };
