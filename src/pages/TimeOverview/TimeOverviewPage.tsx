import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from 'grommet'
import { getPersonalWorktime } from '../../api/worktime-accounting/getPersonalWorktime'

const TimeOverviewPage = (): JSX.Element => {
  const [dates, setDates] = useState<string[]>([])

  useEffect(() => {
    getPersonalWorktime()
      .then(response => {
        setDates(response.map(r => r.date))
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>
            <Text>Datum</Text>
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dates.map((date, index) => (
          <TableRow key={index}>
            <TableCell>
              <Text>{date}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TimeOverviewPage
