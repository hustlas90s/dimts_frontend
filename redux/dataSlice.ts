import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DataRepository from '../repositories/DataRepository'

interface DataShape {
    dataLoading: boolean;
    staffList: any;
    citizenList: any;
    officesList: any;
    provinceList: any;
    docketList: any;
    criminalCaseList: any;
    civilCaseList: any;
    courtHearingList: any;
    pnpRecords: any;
    bjmpRecords: any;
    bucorRecords: any;
}

const initialState: DataShape = {
    dataLoading : false,
    staffList : [],
    citizenList : [],
    officesList : [],
    provinceList : [],
    docketList : [],
    criminalCaseList : [],
    civilCaseList : [],
    courtHearingList : [],
    pnpRecords : [],
    bjmpRecords : [],
    bucorRecords : [],
}

// ACCOUNT THUNKS
export const deleteAccount = createAsyncThunk(
    'data/deleteAccount', 
    async (account_id: number) => {
        const dataRepo = new DataRepository()
        return await dataRepo.DeleteAccount(localStorage.jwt_token, account_id)
    } 
)

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

export const getOfficesList = createAsyncThunk(
    'data/getOfficesList',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetOfficesList(localStorage.jwt_token)
    }
)

// PLACES THUNKS
export const getProvinces = createAsyncThunk(
    'data/getProvinces',
    async () => {
        const dataRepo = new DataRepository()
        const provinces = await dataRepo.GetProvinces()
        const formattedProvinces = provinces.map((province: any) => {
            return { label : province.name, value : province.name }
        })
        return formattedProvinces
    }
)

// HEARING THUNKS 
export const getCourtHearings = createAsyncThunk(
    'data/getCourtHearings',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetCourtHearings(localStorage.jwt_token)
    }
)

export const createNewHearing = createAsyncThunk(
    'data/createNewHearing',
    async (formData: any) => {
        const dataRepo = new DataRepository()
        await dataRepo.NewCourtHearing(localStorage.jwt_token, formData)
    }
)

export const updateHearing = createAsyncThunk(
    'data/updateHearing',
    async (args: { formData: any, hearing_id: number }) => {
        const dataRepo = new DataRepository()
        await dataRepo.UpdateCourtHearing(localStorage.jwt_token, args.formData, args.hearing_id)
    }
)

export const deleteHearing = createAsyncThunk(
    'data/deleteHearing',
    async (hearing_id: number) => {
        const dataRepo = new DataRepository()
        await dataRepo.DeleteCourtHearing(localStorage.jwt_token, hearing_id)
    }
)

// DOCKET THUNKS
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

export const createNewDocket = createAsyncThunk(
    'data/createNewDocket',
    async (formData: any) => {
        const dataRepo = new DataRepository()
        await dataRepo.NewDocket(localStorage.jwt_token, formData)
    }
)

export const updateDocket = createAsyncThunk(
    'data/updateDocket',
    async (args: {formData: any, docket_id: number}) => {
        const dataRepo = new DataRepository()
        await dataRepo.UpdateDocket(localStorage.jwt_token, args.formData, args.docket_id)
    }
)

export const deleteDocket = createAsyncThunk(
    'data/deleteDocket',
    async (docket_id: number) => {
        const dataRepo = new DataRepository()
        await dataRepo.DeleteDocket(localStorage.jwt_token, docket_id)
    }
)

// DETAINEE THUNKS
export const getPNPDetainees = createAsyncThunk(
    'data/getPNPDetainees',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetPNPDetainees(localStorage.jwt_token)
    }
)

export const getBJMPDetainees = createAsyncThunk(
    'data/getBJMPDetainees',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetBJMPDetainees(localStorage.jwt_token)
    }
)

export const getBuCorDetainees = createAsyncThunk(
    'data/getBuCorDetainees',
    async () => {
        const dataRepo = new DataRepository()
        return await dataRepo.GetBuCorDetainees(localStorage.jwt_token)
    }
)

export const createNewDetainee = createAsyncThunk(
    'data/createNewDetainee',
    async (formData: any) => {
        const dataRepo = new DataRepository()
        await dataRepo.NewDetainee(localStorage.jwt_token, formData)
    }
)

export const updateDetainee = createAsyncThunk(
    'data/updateDetainee', 
    async (args: {formData: any, detainee_id: number}) => {
        const dataRepo = new DataRepository()
        await dataRepo.UpdateDetainee(localStorage.jwt_token, args.formData, args.detainee_id)
    }
)

export const deleteDetainee = createAsyncThunk(
    'data/deleteDetainee',
    async (detainee_id: number) => {
        const dataRepo = new DataRepository()
        await dataRepo.DeleteDetainee(localStorage.jwt_token, detainee_id)
    }
)

const dataSlice = createSlice({
    name : 'data',
    initialState,
    reducers : {},
    extraReducers : builder => {
        // ACCOUNTS
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
        // Get Offices Accounts
        builder.addCase(getOfficesList.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getOfficesList.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, officesList : action.payload }
        })
        builder.addCase(getOfficesList.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // PLACES
        // Get Provinces
        builder.addCase(getProvinces.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getProvinces.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, provinceList : action.payload }
        })
        builder.addCase(getProvinces.rejected, (state) => {
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
        // DOCKET
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
        // COURT HEARINGS
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
        // Delete Hearing
        builder.addCase(deleteHearing.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(deleteHearing.fulfilled, (state) => {
            return { ...state, dataLoading : false }
        })
        builder.addCase(deleteHearing.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // DETAINEES
        // Get PNP Detainees
        builder.addCase(getPNPDetainees.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getPNPDetainees.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, pnpRecords : action.payload }
        })
        builder.addCase(getPNPDetainees.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get BJMP Detainees
        builder.addCase(getBJMPDetainees.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getBJMPDetainees.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, bjmpRecords : action.payload }
        })
        builder.addCase(getBJMPDetainees.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // Get BuCor Detainees
        builder.addCase(getBuCorDetainees.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getBuCorDetainees.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, bucorRecords : action.payload }
        })
        builder.addCase(getBuCorDetainees.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // New Detainee
        builder.addCase(createNewDetainee.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(createNewDetainee.fulfilled, (state) => {
            return { ...state, dataLoading : false }
        })
        builder.addCase(createNewDetainee.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
    }
})

export default dataSlice.reducer