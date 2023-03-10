import axios from "axios"

export interface LoginCredentials {
    username: string
    password: string
}

const getSoapBody = (props: LoginCredentials) => {
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
export const login = async (props: LoginCredentials) => {
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        SOAPAction: 'Login',
    }

    const response = await axios.post(`/services/${process.env.REACT_APP_API_SERVICE_BASE}`, getSoapBody(props), {headers})
    return response.data
}