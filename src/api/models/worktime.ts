export interface AbstractCustomField {
  ID: string
  context?: string
  name?: string
  mandatory?: boolean
  active?: boolean
  reportId?: string
  validatorList?: any
  stringValue?: string
}

export interface CustomFieldList {
  abstractCustomField: AbstractCustomField
}

export interface EditWorktimeRequestParameter {
  sessionID: string
  workTimeID?: string
  date: string
  from: string
  to: string
  breakShare?: number
  duration?: number
  ticketID?: string
  projectID?: string
  taskID?: string
  activityID: string
  comment?: string
  billable: boolean
  reasonNotAccountableID?: string
  iccID?: string
  customFieldList?: CustomFieldList
}

export interface WorkTime extends EditWorktimeRequestParameter {
  state: number
  personID: string
  exportDate?: string
  personName: string
  ticketName?: string
  projectName?: string
  taskName: string
  activityName?: string
  reasonNotAccountableName?: string
  iccName?: string
  lastChangedDate?: string
}
