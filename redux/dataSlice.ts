import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DataRepository from '../repositories/DataRepository'

interface DataShape {
    dataLoading: boolean;
    staffList: any;
    citizenList: any;
    docketList: any;
    criminalCaseList: any;
    civilCaseList: any;
    courtHearingList: any;
}

const initialState: DataShape = {
    dataLoading : false,
    staffList : [],
    citizenList : [],
    docketList : [],
    criminalCaseList : [],
    civilCaseList : [],
    courtHearingList : []
}

export const getStaffList = createAsyncThunk(
    'data/getStaffList',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetStaffList(localStorage.jwt_token)
    }
)

export const getCitizenList = createAsyncThunk(
    'data/getCitizenList',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCitizenList(localStorage.jwt_token)
    }
)

export const getDocketList = createAsyncThunk(
    'data/getDocketList',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetDocketList(localStorage.jwt_token)
    }
)

export const getCriminalCases = createAsyncThunk(
    'data/getCriminalCases',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCriminalCases(localStorage.jwt_token)
    }
)

export const getCivilCases = createAsyncThunk(
    'data/getCivilCases',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCivilCases(localStorage.jwt_token)
    }
)

export const getCourtHearings = createAsyncThunk(
    'data/getCourtHearings',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCourtHearings(localStorage.jwt_token)
    }
)

export const deleteAccount = createAsyncThunk(
    'data/deleteAccount', 
    async (account_id: number) => {
        const dataRepo = new DataRepository()
        return await dataRepo.DeleteAccount(localStorage.jwt_token, account_id)
    } 
)

const dataSlice = createSlice({
    name : 'data',
    initialState,
    reducers : {},
    extraReducers : builder => {
        // Get Staff Accounts
        builder.addCase(getStaffList.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getStaffList.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, staffList : action.payload }
        })
        builder.addCase(getStaffList.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Citizen Accounts
        builder.addCase(getCitizenList.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCitizenList.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, citizenList : action.payload }
        })
        builder.addCase(getCitizenList.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Docket List
        builder.addCase(getDocketList.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getDocketList.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, docketList : action.payload }
        })
        builder.addCase(getDocketList.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Criminal Cases
        builder.addCase(getCriminalCases.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCriminalCases.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, criminalCaseList : action.payload }
        })
        builder.addCase(getCriminalCases.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Civil Cases
        builder.addCase(getCivilCases.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCivilCases.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, civilCaseList : action.payload }
        })
        builder.addCase(getCivilCases.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get Court Hearings
        builder.addCase(getCourtHearings.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getCourtHearings.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, courtHearingList : action.payload }
        })
        builder.addCase(getCourtHearings.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Delete Account
        builder.addCase(deleteAccount.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(deleteAccount.fulfilled, (state) => {
            return { ...state, dataLoading : false }
        })
        builder.addCase(deleteAccount.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
    }
})

export default dataSlice.reducer