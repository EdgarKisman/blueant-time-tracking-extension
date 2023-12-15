import axios from 'redaxios'
import { useContext } from 'react'
import { type RequestError } from '../models'
import { AuthContext } from '../../context/AuthContext'
import { getHeaders } from '../factory'
import { XMLParser } from 'fast-xml-parser'
import {
  type AbstractCustomField,
  type CustomFieldList,
  type EditWorktimeRequestParameter,
  type WorkTime
} from '../models/worktime'

function mapToAbstractCustomField(item: any): AbstractCustomField {
  return {
    ID: item.ID,
    context: item.context,
    name: item.name,
    mandatory: item.mandatory,
    active: item.active,
    reportId: item.reportId,
    validatorList: item.validatorList,
    stringValue: item.stringValue
  }
}

function mapToCustomFieldList(item: any): CustomFieldList {
  return {
    abstractCustomField: mapToAbstractCustomField(item.AbstractCustomField)
  }
}

function mapToEditWorktimeRequestParameter(
  item: any
): EditWorktimeRequestParameter {
  return {
    sessionID: item['ns7:sessionID'],
    workTimeID: item['ns7:workTimeID'],
    date: item['ns7:date'],
    from: item['ns7:from'],
    to: item['ns7:to'],
    breakShare: item['ns7:breakShare'],
    duration: item['ns7:duration'],
    ticketID: item['ns7:ticketID'],
    projectID: item['ns7:projectID'],
    taskID: item['ns7:taskID'],
    activityID: item['ns7:activityID'],
    comment: item['ns7:comment'],
    billable: item['ns7:billable'],
    reasonNotAccountableID: item['ns7:reasonNotAccountableID'],
    iccID: item['ns7:iccID'],
    customFieldList: mapToCustomFieldList(item['ns7:customFieldList'])
  }
}

function responseMapper(array: any[]): WorkTime[] {
  return array.map((item) => ({
    ...mapToEditWorktimeRequestParameter(item),
    state: item['ns7:state'],
    personID: item['ns7:personID'],
    exportDate: item['ns7:exportDate'],
    personName: item['ns7:personName'],
    ticketName: item['ns7:ticketName'],
    projectName: item['ns7:projectName'],
    taskName: item['ns7:taskName'],
    activityName: item['ns7:activityName'],
    reasonNotAccountableName: item['ns7:reasonNotAccountableName'],
    iccName: item['ns7:iccName'],
    lastChangedDate: item['ns7:lastChangedDate']
  }))
}

const getSoapBody = (): string => {
  const authentication = useContext(AuthContext)
  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cost="http://cost.blueant.axis.proventis.net/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Header/>
    <soapenv:Body>
        <cost:getPersonalWorktimeRequestParameter>
            <cost:sessionID>${authentication.user?.session.sessionID}</cost:sessionID>
            <cost:workTimeID xsi:nil="true"/>
            <cost:fromDate>${'2023-10-26'}</cost:fromDate>
            <cost:toDate>${'2023-10-27'}</cost:toDate>
            <cost:ticketID xsi:nil="true"/>
            <cost:projectID xsi:nil="true"/>
            <cost:taskID xsi:nil="true"/>
            <cost:state xsi:nil="true"/>
            <cost:billable xsi:nil="true"/>
            <cost:reasonNotAccountableID xsi:nil="true"/>
            <cost:exported xsi:nil="true"/>
            <cost:exportStartDate xsi:nil="true"/>
            <cost:exportEndDate xsi:nil="true"/>
        </cost:getPersonalWorktimeRequestParameter>
    </soapenv:Body>
</soapenv:Envelope>`
}

export const getPersonalWorktime = async (): Promise<WorkTime[]> => {
  return await new Promise((resolve, reject) => {
    axios
      .post(
        `/services/${import.meta.env.VITE_API_PERSONAL_WORKTIME}`,
        getSoapBody(),
        { headers: getHeaders('Login') }
      )
      .then((response) => {
        if (
          typeof response.data === 'string' ||
          response.data instanceof Buffer
        ) {
          const parsed = new XMLParser().parse(response.data)
          const workTimeArray: any[] =
            parsed['soapenv:Envelope']['soapenv:Body']['ns7:WorktimeList'][
              'ns7:WorkTime'
            ]
          resolve(responseMapper(workTimeArray))
        }
      })
      .catch((error) => {
        let responseMessage: string | undefined

        if (error.data !== undefined) {
          const parsed = new XMLParser().parse(error.data as string)
          responseMessage =
            parsed['soapenv:Envelope']['soapenv:Body']['soapenv:Fault']
              .faultstring
        }

        const message: string =
          responseMessage ?? 'Login failed: An unexpected error occurred'
        const statusCode: number = error.status ?? 500
        const requestError: RequestError = { statusCode, message }
        reject(requestError)
      })
  })
}
