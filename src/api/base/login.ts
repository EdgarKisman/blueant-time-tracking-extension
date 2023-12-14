import axios from 'redaxios'
import {
  type BlueAntSession,
  type Credentials,
  type RequestError
} from '../models'
import { getHeaders } from '../factory'
import { XMLParser } from 'fast-xml-parser'

const getSoapBody = (props: Credentials): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:base="http://base.blueant.axis.proventis.net/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Header/>
    <soapenv:Body>
        <base:LoginRequestParameter>
            <base:username>${props.username}</base:username>
            <base:password>${props.password}</base:password>
        </base:LoginRequestParameter>
    </soapenv:Body>
</soapenv:Envelope>`
}

export const login = async (props: Credentials): Promise<BlueAntSession> => {
  return await new Promise((resolve, reject) => {
    axios
      .post(
        `/services/${import.meta.env.VITE_API_SERVICE_BASE}`,
        getSoapBody(props),
        { headers: getHeaders('Login') }
      )
      .then((response) => {
        if (typeof response.data === 'string' || response.data instanceof Buffer) {
          const parsed = new XMLParser().parse(response.data)
        const session =
          parsed['soapenv:Envelope']['soapenv:Body']['ns2:session']
        resolve({
          personID: session['ns2:personID'],
          sessionID: session['ns2:sessionID']
        })}
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
