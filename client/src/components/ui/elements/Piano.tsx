import React, { ReactElement, useEffect, useState } from 'react'

import './piano.css'

interface PianoProps {
    startKey: string,
    endKey: string,
    octaves: number
}

const scaleDegreeMap = new Map<string, number>([
    ['C', 0],
    ['D', 1],
    ['E', 2],
    ['F', 3],
    ['G', 4],
    ['A', 5],
    ['B', 6]
])

const blackKeyMap = new Map<string, string[] | boolean>([
    ['C', false],
    ['D', ['C#', 'Db']],
    ['E', ['D#', 'Eb']],
    ['F', false],
    ['G', ['F#', 'Gb']],
    ['A', ['G#', 'Ab']],
    ['B', ['A#', 'Bb']]
])

const KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const SCALE_DEGREES = 7

const Piano = (props: PianoProps) => {
    
    const NUMBER_OCTAVES = props.octaves

    const [keyElementArray, setKeyElementArry] = useState<ReactElement[]>([])
        
    const getKeysForOctave = (startingKey: string, octaveNumber: number) => {

        const startIndex = scaleDegreeMap.get(startingKey)
        let isFirstNote = true

        if (typeof startIndex !== 'undefined') {
            
            for (let i = startIndex; i < SCALE_DEGREES; i++) {
                
                if (blackKeyMap.get(KEYS[i]) && !isFirstNote) {
                    keyElementArray.push(
                        <li key={KEYS[i]+octaveNumber}>
                            <div className={"anchor"}>
                                <span/>
                            </div>
                        </li>
                    )
                }

                else {
                    keyElementArray.push(
                        <li key={KEYS[i]+octaveNumber}>
                            <div className={"anchor"} />
                        </li>
                    )
                }
            
                if (isFirstNote) {
                    isFirstNote = false
                }
            }
        }
    }

    const getLastOctave = (lastKey: string, octaveNumber: number) => {

        const lastIndex = scaleDegreeMap.get(lastKey)
        let isFirstNote = true

        if (typeof lastIndex !== 'undefined') {
            
            for (let i = 0; i === lastIndex; i++) {
                
                if (blackKeyMap.get(KEYS[i]) && !isFirstNote) {
                    keyElementArray.push(
                        <li key={KEYS[i]+octaveNumber}>
                            <div className={"anchor"}>
                                <span/>
                            </div>
                        </li>
                    )
                }

                else {
                    keyElementArray.push(
                        <li key={KEYS[i]+octaveNumber}>
                            <div className={"anchor"} />
                        </li>
                    )
                }
            
                if (isFirstNote) {
                    isFirstNote = false
                }
            }
        }

    }

    const getIncompleteOctave = (firstKey: string, lastKey: string) => {

        const startIndex = scaleDegreeMap.get(firstKey)
        const lastIndex = scaleDegreeMap.get(lastKey)
        let isFirstNote = true

        if (typeof startIndex !== 'undefined' && typeof lastIndex !== 'undefined') {
            
            for (let i = startIndex; i < lastIndex; i++) {

                if (blackKeyMap.get(KEYS[i]) && !isFirstNote) {
                    keyElementArray.push(
                        <li key={KEYS[i]+0}>
                            <div className={"anchor"}>
                                <span/>
                            </div>
                        </li>
                    )
                }

                else {
                    keyElementArray.push(
                        <li key={KEYS[i]+0}>
                            <div className={"anchor"} />
                        </li>
                    )
                }
            
                if (isFirstNote) {
                    isFirstNote = false
                }
            }
        }
    }

    const populatePiano = (numberOctaves: number) => {

        if (props.octaves === 1) {
            getIncompleteOctave(props.startKey, props.endKey)
        }

        else {

            let octave = 0
            let firstOctave = true
    
            while (octave !== numberOctaves) {
                if (firstOctave) {
                    getKeysForOctave(props.startKey, octave)
                    firstOctave = false
                }
                else {
                    getKeysForOctave('C', octave)
                }
                octave++
            }
    
            getLastOctave(props.endKey, octave)

        }
    }

    useEffect(() => {
        populatePiano(NUMBER_OCTAVES)
    }, [])
    
    return (
        <div id="piano-container">
            <ul id="piano">
                {keyElementArray}
            </ul>
        </div>
    )
}

export default Piano