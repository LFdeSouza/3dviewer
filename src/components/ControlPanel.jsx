import React, { useContext, useState } from 'react'
import { Box, Flex, Grid, Text, IconButton, Slider, Heading, Button, Label, Input } from 'theme-ui'
import { ViewerContext } from '../App'

const ControlPanel = () => {

    const { state, setState } = useContext(ViewerContext)
    const handleVisible = (e, uid) => {
        e.stopPropagation()
        setState(prev => {
            return {
                ...prev, modelOptions: {
                    ...prev.modelOptions, [uid]: { ...prev.modelOptions[uid], opacity: prev.modelOptions[uid].opacity === 0 ? 1 : 0 }
                }
            }
        })
    }
    const handleOpacity = (value, uid) => {
        setState(prev => {
            console.log(prev[uid])
            return { ...prev, modelOptions: { ...prev.modelOptions, [uid]: { ...prev.modelOptions[uid], opacity: value } } }
        })
    }

    if (!Object.keys(state.modelOptions).length) {
        return null
    }
    return (
        <Flex sx={{ flexDirection: 'column', justifyContent: 'space-between', position: 'absolute', left: 2, top: 2, p: 3, width: '15rem', bg: 'rgba(33, 37, 41, 0.6)', borderRadius: '5px' }}>
            <Box>
                <Flex sx={{ alignItems: 'center', gap: 2, mb: 4 }}>
                    <IconButton sx={{ height: 'fit-content', cursor: 'pointer' }} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='white'><title>chevron-left-box</title><path d="M19,3H5A2,2 0 0,0 3,5V19C3,20.11 3.9,21 5,21H19C20.11,21 21,20.11 21,19V5A2,2 0 0,0 19,3M15.71,16.59L14.29,18L8.29,12L14.29,6L15.71,7.41L11.12,12L15.71,16.59Z" /></svg>
                    </IconButton>
                    <Heading sx={{ fontSize: ['1rem', '0.8rem'] }}>Painel de Controle</Heading>
                </Flex>
                <Flex sx={{ flexDirection: 'column' }}>
                    {Object.keys(state.modelOptions).map(i => (
                        <ModelControls key={i} uid={i} handleVisible={handleVisible} handleOpacity={handleOpacity} modelOptions={state.modelOptions[i]} />
                    ))}
                </Flex>
            </Box>

            <Box>

            </Box>
        </Flex>
    )
}

export default ControlPanel


const ModelControls = ({ uid, handleOpacity, handleVisible, modelOptions }) => {
    const [opacitySliderOpen, setOpacitySliderOpen] = useState(false)

    return <Grid columns={[3, '1fr 1fr 1fr 1fr']} sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text sx={{ fontSize: 12 }}>{modelOptions.name.split(".")[0]}</Text>
        <IconButton sx={{ cursor: 'pointer', height: '1.5rem' }}
            onClick={(e) => handleVisible(e, uid)}
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={16} fill='white'><title>eye-circle-outline</title><path d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M12,8C14.63,8 17,9.57 18,12C16.62,15.31 12.81,16.88 9.5,15.5C7.92,14.84 6.66,13.58 6,12C7,9.57 9.37,8 12,8M12,9.5A2.5,2.5 0 0,0 9.5,12A2.5,2.5 0 0,0 12,14.5A2.5,2.5 0 0,0 14.5,12A2.5,2.5 0 0,0 12,9.5" /></svg>
        </IconButton>
        <Box sx={{ position: 'relative' }}>
            <IconButton sx={{ cursor: 'pointer', height: '1.5rem' }}
                onClick={() => setOpacitySliderOpen(!opacitySliderOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={16} fill="white"><title>circle-opacity</title><path d="M18 10V8H20V10H18M18 12V10H16V12H18M18 8V6H16V8H18M16 2.84V4H18C17.37 3.54 16.71 3.15 16 2.84M18 4V6H20C19.42 5.25 18.75 4.58 18 4M20 6V8H21.16C20.85 7.29 20.46 6.63 20 6M22 12C22 11.32 21.93 10.65 21.8 10H20V12H22M16 6V4H14V6H16M16 16H18V14H16V16M18 18H20L20 18V16H18V18M16 20H18L18 20V18H16V20M14 21.8C14.7 21.66 15.36 21.44 16 21.16V20H14V21.8M18 14H20V12H18V14M16 8H14V10H16V8M20 16H21.16C21.44 15.36 21.66 14.7 21.8 14H20V16M16 12H14V14H16V12M12 18V16H14V14H12V12H14V10H12V8H14V6H12V4H14V2.2C13.35 2.07 12.69 2 12 2C6.5 2 2 6.5 2 12S6.5 22 12 22V20H14V18H12M14 18H16V16H14V18Z" /></svg>
            </IconButton>
            {opacitySliderOpen && <OpacitySlider uid={uid} handleOpacity={handleOpacity} value={modelOptions.opacity} />}
        </Box>
        {/* <Box>
            <input type="color" id="uid" name="uid" value={options.color} />
        </Box> */}
    </Grid>
}

const OpacitySlider = ({ handleOpacity, uid, value }) => {
    return <Flex sx={{ position: 'absolute', top: 0, left: 4, p: 3, height: '2rem', width: '10rem', bg: 'rgba(233, 236, 239, 0.2)', borderRadius: '5px', alignItems: 'center' }}>
        <Slider min={0} max={1} defaultValue={value} step={0.1} onChange={(e) => handleOpacity(e.target.value, uid)} />
    </Flex>
}