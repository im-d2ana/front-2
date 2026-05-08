import TableRow from "./TableRow";

const TableHead = (props) => {
    return (
        <thead>
            <tr>
                <TableRow row={props.head} isHead='1'/>
            </tr>
        </thead>
    );
}

export default TableHead;