import { backendConn, placesConn } from "./connection";

export default class DataRepository {
    // GET REQUESTS
    // Get Staff Accounts
    async GetStaffList(jwt_token: string) {
        const { data } = await backendConn.get('staff_accounts/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Staff Accounts
    async GetCitizenList(jwt_token: string) {
        const { data } = await backendConn.get('citizen_accounts/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Offices Accounts
    async GetOfficesList(jwt_token: string) {
        const { data } = await backendConn.get('offices_accounts/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Docket List
    async GetDocketList(jwt_token: string) {
        const { data } = await backendConn.get('docket_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Criminal Cases
    async GetCriminalCases(jwt_token: string) {
        const { data } = await backendConn.get('criminal_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Civil Cases
    async GetCivilCases(jwt_token: string) {
        const { data } = await backendConn.get('civil_cases/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return data.results
    }
    // Get Court Hearings
    async GetCourtHearings(jwt_token: string) {
        const { data } = await backendConn.get('court_hearings/', {
            headers : {
                Authorization : `Bearer ${ jwt_token }`,
                'Content-Type' : 'aplication/json'
            }
        })
        return JSON.parse(data)
    }
    async GetProvinces() {
        const { data } = await placesConn.get('provinces/112300000/cities-municipalities/', {
            headers : { 
                'Content-Type' : 'aplication/json'
            }
        })
        return data
    }
    // POST REQUESTS
    // Create new court hearing
    async NewCourtHearing(jwt_token: string, formData: any) {
        const { data } = await backendConn.post('new_hearing/', formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data
    }
    // Create new docket
    async NewDocket(jwt_token: string, formData: any) {
        const { data } = await backendConn.post('new_docket/', formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data
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
    // Update court hearing
    async UpdateCourtHearing(jwt_token: string, formData: any, hearing_id: number) {
        const { data } = await backendConn.put(`hearing/update/${ hearing_id }`, formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // Update docket
    async UpdateDocket(jwt_token: string, formData: any, docket_id: number) {
        const { data } = await backendConn.put(`docket/update/${ docket_id }`, formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    // DELETE REQUESTS
    // Delete an account
    async DeleteAccount(jwt_token: string, account_id: number) {
        const { data } = await backendConn.delete(`account/delete/${ account_id }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    async DeleteCourtHearing(jwt_token: string, hearing_id: number) {
        const { data } = await backendConn.delete(`hearing/delete/${ hearing_id }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
    async DeleteDocket(jwt_token: string, docket_id: number) {
        const { data } = await backendConn.delete(`docket/delete/${ docket_id }`, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
        return data.results
    }
}