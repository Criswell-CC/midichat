export enum UserActionNames {
    UPDATE_USER_ID = "UPDATE_USER_ID",
    UPDATE_TYPE = "UPDATE_TYPE",
    UPDATE_USERNAME = "UPDATE_USERNAME"
}

export type UserAction =
    {
        type: typeof UserActionNames.UPDATE_USER_ID,
        payload: { id: string }
    } 
    | {
        type: typeof UserActionNames.UPDATE_TYPE,
        payload: { type: string }
    }
    | {
        type: typeof UserActionNames.UPDATE_USERNAME,
        payload: { username: string }
    }

export const updateUserIdAction = (id: string) => ({
    type: UserActionNames.UPDATE_USER_ID,
    payload: id
})

export const updateTypeAction = (type: string) => ({
    type: UserActionNames.UPDATE_TYPE,
    payload: type
})

export const updateUsernameAction = (username: string) => ({
    type: UserActionNames.UPDATE_USERNAME,
    payload: username
})