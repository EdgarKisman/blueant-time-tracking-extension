export const getHeaders = (SOAPAction: string): Record<string, string> => (
    {
        'Content-Type': 'text/xml;charset=UTF-8',
        SOAPAction,
    }
)