import { backendConn } from "./connection";

export default class DataRepository {
    // GET REQUESTS
    // Get Staff Accounts
    async GetStaffList(jwt_token: string) {
        const res = await backendConn.get('staff_accounts/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        return res.data.results
    }
    // Get Staff Accounts
    async GetCitizenList(jwt_token: string) {
        const res = await backendConn.get('citizen_accounts/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        return res.data.results
    }
    // Get Docket List
    async GetDocketList(jwt_token: string) {
        const res = await backendConn.get('docket_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        return res.data.results
    }
    // Get Criminal Cases
    async GetCriminalCases(jwt_token: string) {
        const res = await backendConn.get('criminal_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        return res.data.results
    }
    // Get Civil Cases
    async GetCivilCases(jwt_token: string) {
        const res = await backendConn.get('civil_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        return res.data.results
    }
    // Get Court Hearings
    async GetCourtHearings(jwt_token: string) {
        const res = await backendConn.get('court_hearings/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        console.log('Court hearing repo: ', res)
        return JSON.parse(res.data)
    }
}