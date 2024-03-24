import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Lession3.scss'
import {RootState} from '../../redux/store.ts'

import ListItem from "../../components/ListItem/index.tsx";
import Button from '../../components/Button/index.tsx'
import { Item } from "../../interfaces/item.interface.ts";
import { thayDoiPhanTu } from "../../utils/index.ts";

import { updateItemService } from '../../services/item.service.ts'

function  Lession3() {

    const { items, updateItem } = useSelector((state : RootState) => state.item)
    const {isFetching} = updateItem

    const [active, setActive] = useState(false)
    const [resetValue, setResetValue] = useState(false)

    const dispatch = useDispatch()

    const newData:Item[] = [...items]

    const handleChangeForm = useCallback((body:{isActive:boolean, payload:Item}) => {
        const {isActive, payload} = body
        setActive(isActive)
        thayDoiPhanTu(newData, payload)
    },[])

    const handleConfirm = useCallback(() => {
        setActive(false)
        updateItemService(dispatch, [...newData])
    },[])

    const handleReset = useCallback(() => {
        setActive(false)
        setResetValue(true)
    },[])

    //Khi component được mount thì sẽ gọi api
    useEffect(() => {
        updateItemService(dispatch, [...items])
    },[])

    return ( 
        <div className="wrapper-lession3">
            <div className="inner-lession3">
                <div className="btns">
                    <Button onClick={handleConfirm} primary={active} disabled={!active} text="Confirm"/>
                    <Button onClick={handleReset} primary={active} disabled={!active} text="Reset"/>
                </div>
                {items && items.map((item, index) => {
                    return (
                        <ListItem 
                            onChangeForm={handleChangeForm} 
                            isReset={resetValue}
                            setReset={setResetValue}
                            key={index}
                            loading={isFetching}
                            {...item}
                        />
                    )
                })}
            </div>
        </div>
     );
}

export default Lession3;