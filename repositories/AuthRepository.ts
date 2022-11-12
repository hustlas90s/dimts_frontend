import { backendConn } from "./connection";

interface RegisterParams {
    first_name: string;
    last_name: string;
    contact_number: string;
    email: string;
    username: string;
    password: string;
    role: string;
}

export default class AuthRepository {
    // Login Account
    async LoginAccount (formData: FormData) {
        const res = await backendConn.post('api/token/', formData, {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        })
        console.log('Auth Repo LoginAccount: ', res.data)
        return res.data
    }
    // Register Account
    async RegisterAccount(formData: RegisterParams) {
        const res = await backendConn.post('register/', formData, {
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        return res.data
    }
    // GET REQUESTS
    // Get Account Details
    async GetAccountDetails (decoded_token: string, user_id: number) {
        const res = await backendConn.get(`account/${ user_id }`, {
            headers : {
                Authorization : `Bearer ${ decoded_token }`
            }
        })
        return res.data
    }
    // Get Staff Accounts
    async GetStaffAccounts (decoded_token: string) {
        const res = await backendConn.get('citizen_accounts/', {
            headers : {
                Authorization : `Bearer ${ decoded_token }`
            }
        })
        return res.data.results
    }
    // Get Citizen Accounts
    async GetCitizenAccounts(decoded_token: string) {
        const res = await backendConn.get('citizen_accounts/', {
            headers : {
                Authorization : `Bearer ${ decoded_token }`
            }
        })
        return res.data.results
    }
    // PUT REQUESTS
    // Update account
    async UpdateAccount(jwt_token: string, formData: any, account_id: number) {
        const res = await backendConn.put(`account/update/${ account_id }`, formData, {
            headers : {
                Authorization : `Bearer ${ jwt_token }`
            }
        })
    }
}