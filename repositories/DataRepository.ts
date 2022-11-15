import { backendConn } from "./connection";

export default class DataRepository {
    // GET REQUESTS
    // Get Staff Accounts
    async GetStaffList(jwt_token: string) {
        const { data } = await backendConn.get('staff_accounts/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        return data.results
    }
    // Get Staff Accounts
    async GetCitizenList(jwt_token: string) {
        const { data } = await backendConn.get('citizen_accounts/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        return data.results
    }
    // Get Docket List
    async GetDocketList(jwt_token: string) {
        const { data } = await backendConn.get('docket_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        return data.results
    }
    // Get Criminal Cases
    async GetCriminalCases(jwt_token: string) {
        const { data } = await backendConn.get('criminal_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        return data.results
    }
    // Get Civil Cases
    async GetCivilCases(jwt_token: string) {
        const { data } = await backendConn.get('civil_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        return data.results
    }
    // Get Court Hearings
    async GetCourtHearings(jwt_token: string) {
        const { data } = await backendConn.get('court_hearings/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aaplication/json'
            }
        })
        return JSON.parse(data)
    }
    // PUT REQUESTS
    // Update account
    async UpdateAccount(jwt_token: string, formData: any, account_id: number) {
        const { data } = await backendConn.put(`account/update/${ account_id }`, formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // DELETE REQUESTS
    async DeleteAccount(jwt_token: string, account_id: number) {
        const { data } = await backendConn.delete(`account/delete/${ account_id }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
}