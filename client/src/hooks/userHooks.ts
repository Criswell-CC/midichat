'use client'

import { useEffect } from 'react'

import { UserActionNames } from '@/actions/userActions'

import { IUserContext } from '@/types/user'

export const useDispatchId = (userId: string, userContext: IUserContext) => {

    useEffect(() => {
        if (!userContext.state.id) {
            userContext.dispatch({type: UserActionNames.UPDATE_USER_ID, payload: { id: userId }})
        }
    }, [userId, userContext])
}

export const useDispatchUserType = (userType: string, userContext: IUserContext) => {

    useEffect(() => {

        if (!userContext.state.type) {
            userContext.dispatch({type: UserActionNames.UPDATE_TYPE, payload: { type: userType }})
        }

    }, [userType, userContext])
}