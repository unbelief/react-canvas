import { Props, Event } from "./types";
interface TableProps extends Props {
    summary: Array<Object>;
    data: Array<Object>;
    event?: Event;
}
declare function Table(props: TableProps): null;
export { Table };
