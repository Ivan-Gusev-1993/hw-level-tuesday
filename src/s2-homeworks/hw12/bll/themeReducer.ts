export type ThemeState = {
    themeId: number
}

export type SetThemeIdAction = {
    type: 'SET_THEME_ID'
    payload: {
        themeId: number | string  // Разрешаем получение строки
    }
}

export type ThemeActions = SetThemeIdAction

const initState: ThemeState = {
    themeId: 1,
}

export const themeReducer = (state = initState, action: ThemeActions): ThemeState => {
    switch (action.type) {
        case 'SET_THEME_ID':
            return {
                ...state,
                // Принудительно преобразуем к числу
                themeId: Number(action.payload.themeId)
            }
        default:
            return state
    }
}

// Гарантируем отправку числа
export const changeThemeId = (id: number): SetThemeIdAction => ({
    type: 'SET_THEME_ID',
    payload: { themeId: id }
})