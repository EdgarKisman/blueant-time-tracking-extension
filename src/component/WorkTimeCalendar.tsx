import React, { useState } from 'react'

import { Box, DateInput } from 'grommet'

export const WorkTimeCalendar = (): JSX.Element => {
  const [value, setValue] = useState<string[] | undefined>([
    '2020-07-31',
    '2020-08-07'
  ])
  const onChange = (event: any): void => {
    const nextValue: any[] = event.value
    console.log(typeof event)
    setValue(nextValue)
  }
  return (
    <Box direction="row-responsive">
      <DateInput
        value={value}
        buttonProps={{
          label: value
        }}
        onChange={onChange}
      />
    </Box>
  )
}

export default WorkTimeCalendar
