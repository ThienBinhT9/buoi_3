import {createSlice} from '@reduxjs/toolkit'
import { data } from '../utils/fakeData.ts'
import {Item} from '../interfaces/item.interface.ts'

interface IInitState{
    items:Item[],
    updateItem:{
        isFetching:boolean,
        error:boolean
    }
}

const initialState : IInitState = {
    items:data,
    updateItem:{
        isFetching:false,
        error:false
    }
}

const ItemSlice = createSlice({
    name:"item",
    initialState,
    reducers:{
        updateStart:(state: IInitState) => {
            state.updateItem.isFetching = true
            state.updateItem.error = false
        },
        updateSuccess:(state: IInitState, action) => {
            state.updateItem.isFetching = false
            state.items = action.payload
            state.updateItem.error = false
        },
        updateFailed:(state: IInitState) => {
            state.updateItem.isFetching = false
            state.updateItem.error = true
        },
    }
})

export const {updateStart, updateSuccess, updateFailed} = ItemSlice.actions
export default ItemSlice.reducer