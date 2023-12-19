import React, { useState } from 'react'
import { getPersonalWorktime } from '../../api/worktime-accounting/getPersonalWorktime'
import { type WorkTime } from '../../api/models/worktime'
import PersonalWorkTimeTable from '../../component/PersonalWorkTimeTable'
const TimeOverviewPage = (): JSX.Element => {
  const [items, setItems] = useState<WorkTime[] | undefined>(undefined)

  getPersonalWorktime()
    .then((response) => {
      setItems(response.map((r) => r))
    })
    .catch((error) => {
      console.log(error)
    })

  return (
    <>
      {items !== null && items !== undefined && (
        <PersonalWorkTimeTable WorkTimes={items} />
      )}
    </>
  )
}

export default TimeOverviewPage
