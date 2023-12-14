import axios from 'redaxios'
import { useContext } from "react"
import { BlueAntSession, Credentials, type RequestError } from "../models"
import { AuthContext } from "../../context/AuthContext"
import { getHeaders } from '../factory'
import { XMLParser } from 'fast-xml-parser'
import { worktime } from '../models/worktime'

const getSoapBody = (): string => {
  const authentication = useContext(AuthContext)
  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cost="http://cost.blueant.axis.proventis.net/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Header/>
    <soapenv:Body>
        <cost:getPersonalWorktimeRequestParameter>
            <cost:sessionID>${authentication.user?.session.sessionID}</cost:sessionID>
            <cost:workTimeID xsi:nil="true"/>
            <cost:fromDate>${"2023-10-26"}</cost:fromDate>
            <cost:toDate>${"2023-10-27"}</cost:toDate>
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

export const getPersonalWorktime = async (): Promise<string> => {
  const authentication = useContext(AuthContext)
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
          const workTimeArray = parsed["soapenv:Envelope"]["soapenv:Body"]["ns7:WorktimeList"]["ns7:WorkTime"]
          console.log(workTimeArray[0]["ns7:taskName"])
          resolve(
            ""
          )
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