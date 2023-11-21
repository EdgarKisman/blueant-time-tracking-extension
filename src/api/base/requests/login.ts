import axios from "redaxios"
import {BlueAntSession, Credentials, RequestError} from "../typings"
import {getHeaders} from "../../factory"
import {XMLParser} from 'fast-xml-parser'

const getSoapBody = (props: Credentials) => {
    return (
        `<?xml version="1.0" encoding="UTF-8"?>
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:base="http://base.blueant.axis.proventis.net/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <soapenv:Header/>
    <soapenv:Body>
        <base:LoginRequestParameter>
            <base:username>${props.username}</base:username>
            <base:password>${props.password}</base:password>
        </base:LoginRequestParameter>
    </soapenv:Body>
</soapenv:Envelope>`)
}

export const login = (props: Credentials): Promise<BlueAntSession> => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/services/${import.meta.env.VITE_API_SERVICE_BASE}`, getSoapBody(props), {headers: getHeaders('Login')})
            .then(response => {
                const parsed = new XMLParser().parse(response.data)
                const session = parsed['soapenv:Envelope']['soapenv:Body']['ns2:session']
                resolve({personID: session['ns2:personID'], sessionID: session['ns2:sessionID']})
            })
            .catch((error) => {
                let responseMessage: string | undefined = undefined

                if (error.data) {
                    const parsed = new XMLParser().parse(error.data)
                    responseMessage = parsed['soapenv:Envelope']['soapenv:Body']['soapenv:Fault']['faultstring']
                }

                const message: string = responseMessage || 'Login failed: An unexpected error occurred'
                const statusCode: number = error.status || 500
                reject({statusCode, message} as RequestError)
            })
    })
}