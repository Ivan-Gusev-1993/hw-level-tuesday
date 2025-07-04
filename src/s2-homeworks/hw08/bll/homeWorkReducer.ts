import {UserType} from '../HW8'
import {elGR} from "@mui/material/locale";

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            if (action.payload === "up") {
                return [...state].sort((a, b) => a.name.localeCompare(b.name))
            }
            if (action.payload === "down") {
                return [...state].sort((a, b) => b.name.localeCompare(a.name))
            }// need to fix
            return state
        }
        case 'check': {
            return state.filter(el => el.age >=18 ? el : '') // need to fix
        }
        default:
            return state
    }
}
