import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState, useEffect } from 'react'
import SuperInputText from '../../../hw04/common/c1-SuperInputText/SuperInputText'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
export type SuperDebouncedInputPropsType = Omit<DefaultInputPropsType, 'type'> & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
} & { // плюс специальный пропс SuperPagination
    onDebouncedChange?: (value: string) => void
}

const SuperDebouncedInput: React.FC<SuperDebouncedInputPropsType> = (
    {
        onChangeText,
        onDebouncedChange,
        ...restProps // все остальные пропсы попадут в объект restProps
    }
) => {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)

    // Функция очистки таймера
    const clearTimer = () => {
        if (timerId) {
            clearTimeout(timerId)
            setTimerId(undefined)
        }
    }

    // Очищаем таймер при размонтировании компонента
    useEffect(() => {
        return () => {
            clearTimer()
        }
    }, [])

    const onChangeTextCallback = (value: string) => {
        onChangeText?.(value)

        if (onDebouncedChange) {
            // Останавливаем предыдущий таймер
            clearTimer()

            // Запускаем новый таймер на 1500ms
            const newTimerId = window.setTimeout(() => {
                onDebouncedChange(value)
            }, 1500)

            setTimerId(newTimerId)
        }
    }

    return (
        <SuperInputText onChangeText={onChangeTextCallback} {...restProps}/>
    )
}

export default SuperDebouncedInput