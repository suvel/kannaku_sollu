import "./Table.scss";

const getDataUpdated = (dataArr) => {
  return dataArr.map((data, index) => ({ ...data, sno: index + 1 }));
};

const renderCell = (column, row) => {
  if (column.Cell) {
    return column.Cell({ cell: { row: { original: row } } });
  }
  return row[column.accessor];
};

function Table({ columns, data, style }) {
  columns.unshift({
    Header: "#",
    accessor: "sno",
  });

  const rows = getDataUpdated(data);

  return (
    <table style={style}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={row.id ?? rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{renderCell(column, row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
