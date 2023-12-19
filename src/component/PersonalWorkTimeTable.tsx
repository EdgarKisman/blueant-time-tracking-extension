import React, { useState, useEffect } from 'react'
import { type WorkTime } from '../api/models/worktime'
import { DataTable, Text } from 'grommet'

interface PersonalWorktimeProps {
  WorkTimes: WorkTime[]
}

interface Data {
  date: string
  from: string
  to: string
  taskName: string
}

const PersonalWorkTimeTable = (props: PersonalWorktimeProps): JSX.Element => {
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    const DATA = props.WorkTimes.map((item) => {
      return {
        date: item.date.slice(0, 10),
        from: item.from.slice(0, 8),
        to: item.to.slice(0, 8),
        taskName: item.taskName
      }
    })
    setData(DATA)
    console.log(data)
  }, [props.WorkTimes])

  return (
    <DataTable
      key={data.length}
      columns={[
        {
          property: 'date',
          header: <Text>Datum</Text>,
          search: true
        },
        {
          property: 'from',
          header: <Text>Von</Text>
        },
        {
          property: 'to',
          header: <Text>Bis</Text>
        },
        {
          property: 'taskName',
          header: <Text>Beschreibung</Text>,
          search: true
        }
      ]}
      data={data}
      sortable
    />
  )
}

export default PersonalWorkTimeTable
