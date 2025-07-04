import React, {useState, useEffect} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    // Форматирование времени в строку HH:MM:SS
    const formatTime = (date: Date): string => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }

    // Форматирование даты в строку DD.MM.YYYY
    const formatDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }

    // Получение названия дня недели
    const getDayName = (date: Date): string => {
        return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
    }

    // Получение названия месяца
    const getMonthName = (date: Date): string => {
        return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
    }

    const start = () => {
        // Останавливаем предыдущий таймер, если был
        stop()

        // Запускаем новый интервал
        const id = window.setInterval(() => {
            setDate(new Date())
        }, 1000)

        setTimerId(id)
    }

    const stop = () => {
        if (timerId !== undefined) {
            clearInterval(timerId)
            setTimerId(undefined)
        }
    }

    const onMouseEnter = () => {
        setShow(true)
    }

    const onMouseLeave = () => {
        setShow(false)
    }

    // Очищаем интервал при размонтировании компонента
    useEffect(() => {
        return () => {
            stop()
        }
    }, [])

    const stringTime = formatTime(date)
    const stringDate = formatDate(date)
    const stringDay = getDayName(date)
    const stringMonth = getMonthName(date)

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={timerId !== undefined} // true если таймер запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={timerId === undefined} // true если таймер остановлен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock