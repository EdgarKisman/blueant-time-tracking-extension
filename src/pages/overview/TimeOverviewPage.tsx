import { Table, TableCell, TableHeader, TableRow, Text } from "grommet"

const TimeOverviewPage = () => {
  const columns = ["Time", "Test", "Test2"]
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableCell key={index} scope="col">
              <Text>{column}</Text>
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
    </Table>
  )
}

export default TimeOverviewPage
