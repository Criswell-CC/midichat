import { createRequire } from "module"
const require = createRequire(import.meta.url)

import { Request, Response, NextFunction } from 'express'

const Profanity = require('profanity-js')

const { body, validationResult, Result } = require('express-validator')

enum userTypes {
    BROADCASTER = "broadcaster",
    LISTENER = "listener"
}

export const validateAuthenticateRules = () => {
    return [
        body('user_id').exists().notEmpty().isUUID(4),
        body('room_id').exists().notEmpty().isUUID(4),
        body('user_type').exists().notEmpty().isString().isIn([userTypes.BROADCASTER, userTypes.LISTENER])
    ]
}

export const validateAuthenticateRequest = (req: Request, res: Response, next: NextFunction) => {

    const errors: typeof Result = validationResult(req)
    
    if (errors.isEmpty()) {
        next()
    }

    else {
        const extractedErrors: typeof Result[] = []

        errors.array().map((error: typeof Result) => { 
            extractedErrors.push({ [error.name]: error.msg }) }
        )

        console.log("Validate authenticate request error(s): " + extractedErrors)
    
        return res.status(422).send({
            authenticated: false,
            errors: extractedErrors
        })
    }
}

export const validateCheckJoinRoomRules = () => {
    return body('room_id').exists().notEmpty()
}

export const validateCheckJoinRoomRequest = (req: Request, res: Response, next: NextFunction) => {
    
    const errors: typeof Result = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }

    else {
        const extractedErrors: typeof Result[] = []

        errors.array().map((error: typeof Result) => { 
            extractedErrors.push({ [error.name]: error.msg }) }
        )
            
        console.log("Validate check join room request error(s): " + extractedErrors)
    
        return res.status(422).send({
            valid: false,
            message: "Invalid request body",
            errors: extractedErrors
        })
    }
}

export const validateCheckUsernameRules = () => {
    return body('username').exists().notEmpty()
}

export const validateCheckUsernameRequest = (req: Request, res: Response, next: NextFunction) => {

    const errors: typeof Result = validationResult(req)
    
    if (errors.isEmpty()) {

        const filter = new Profanity()

        if (filter.isProfane(req.body.username)) {

            console.log("Username profanity validation error")

            return res.status(400).send({
                valid: false,
                message: "Invalid username"
            })
        }

        else {
            return next()
        }
    }

    else {

        const extractedErrors: typeof Result[] = []

        errors.array().map((error: typeof Result) => { 
            extractedErrors.push({ [error.name]: error.msg }) }
        )

        console.log("Validate check username request error(s): " + extractedErrors)
    
        return res.status(422).send({
            valid: false,
            message: "Invalid request body",
            errors: extractedErrors
        })
    }
}