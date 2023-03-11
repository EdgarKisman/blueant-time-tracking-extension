import axios from "redaxios"
import {Credentials, RequestError, UserSession} from "../typings"
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

export const login = (props: Credentials): Promise<UserSession> => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/services/${import.meta.env.VITE_API_SERVICE_BASE}`, getSoapBody(props), {headers: getHeaders('Login')})
            .then(response => {
                const parsed = new XMLParser().parse(response.data)
                const session = parsed['soapenv:Envelope']['soapenv:Body']['ns2:session']
                resolve({personID: session['ns2:personID'], sessionID: session['ns2:sessionID']})
            })
            .catch((error) => {
                const errorResponse = error.data
                const errorMessage =
                    error.data?.fault?.detail?.AXIS_FAULT?.faultstring ||
                    'Login failed: An unexpected error occurred'
                const errorCode = error.response?.status || 5001
                const userError: RequestError = { errorCode, errorMessage };
                reject(userError)
            })
    })
}