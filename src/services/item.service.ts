import { Item } from '../interfaces/item.interface.ts'
import {updateStart, updateSuccess, updateFailed} from '../redux/ItemSlice.ts'

export const updateItemService = async(dispatch, body:Item[]) => {
    try {
        dispatch(updateStart())
        
        //fetch API giả sử mất 3s
        const promise = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(body)
            },0)
        })
        .then((data) => {
            dispatch(updateSuccess(data))
        })

    } catch (error) {
        dispatch(updateFailed())
    }
}