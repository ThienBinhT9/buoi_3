import React, { memo, useEffect, useState } from "react";
import { Item } from '../../interfaces/item.interface.ts';
import { useSelector } from "react-redux";


import './ListItem.scss'
import LoadingBlurred from "../Loading/index.tsx";
import {RootState} from '../../redux/store.ts'

interface Props extends Item{
    onChangeForm:(body:{
        isActive:boolean, 
        payload:Item, 
    }) => void,
    setReset:React.Dispatch<React.SetStateAction<boolean>>
    isReset:boolean
    loading:boolean
}

function ListItem(props : Props) {

    
    const {id, avatar, title, subTitle, loading, onChangeForm, isReset, setReset} = props

    const [isLoading, setLoading] = useState(false)

    const [editTitle, setEditTitle] = useState(true)
    const [editSubTitle, setEditSubTitle] = useState(true)

    const [_title, setTitle] = useState(title)
    const [_subTitle, setSubTitle] = useState(subTitle)

    const handleChangeTitle = (e) => {
        const currentValue:string = e.target.value
        const valid = title === currentValue || !currentValue.trim() || subTitle === currentValue

        setTitle(e.target.value)
        onChangeForm({
            isActive:(valid) ? false : true,
            payload:{
                title:currentValue,
                subTitle:_subTitle,
                id
            }
        })
    }
    
    const handleChangeSubTitle = (e) => {
        const currentValue:string = e.target.value
        const valid = title === currentValue || !currentValue.trim() || subTitle === currentValue

        setSubTitle(currentValue)
        onChangeForm({
            isActive:(valid) ? false : true,
            payload:{
                subTitle:currentValue,
                title:_title,
                id
            },
        })
    }

    useEffect(() => {
        if(isReset){
            setSubTitle(subTitle)
            setTitle(title)
            setReset(false)
        }
    },[isReset])
    
    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    },[id, avatar, title, subTitle])

    return ( 
        <div className="wrapper-listItem">
            {isLoading && <LoadingBlurred />}
            <div className="listItem__avatar">
                <img src={avatar} alt="avatar"/>
            </div>
            <div className="listItem__info">
                {editTitle ? (
                    <label onClick={() => setEditTitle(false)} className="listItem__title">{_title}</label>
                ) : (
                    <input 
                        type="text"
                        id="title"
                        className="listItem__title"
                        onBlur={() => setEditTitle(true)}
                        value={_title}
                        onChange={handleChangeTitle}
                        autoFocus
                    />
                )}
                {editSubTitle ? (
                    <label onClick={() => setEditSubTitle(false)} className="listItem__subTitle">{_subTitle}</label>
                ) : (
                    <input 
                        type="text"
                        id="subTitle"
                        className="listItem__subTitle"
                        onBlur={() => setEditSubTitle(true)}
                        value={_subTitle}
                        onChange={handleChangeSubTitle}
                        autoFocus
                    />
                )}
            </div>
        </div>
     );
}

export default memo(ListItem);