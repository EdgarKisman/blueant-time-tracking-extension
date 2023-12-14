import React from 'react'
import { Table, TableCell, TableHeader, TableRow, Text } from 'grommet'
import { getPersonalWorktime } from '../../api/worktime-accounting/getPersonalWorktime'

const TimeOverviewPage = (): JSX.Element => {
  const columns = ['Time', 'Test', 'Test2']
  getPersonalWorktime()
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
