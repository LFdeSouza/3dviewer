import { useContext, useState } from 'react'
import { Box, Flex, Grid, Text, IconButton, Slider, Heading } from 'theme-ui'
import { ViewerContext } from '../App'
import { HexColorPicker } from 'react-colorful'

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
            return { ...prev, modelOptions: { ...prev.modelOptions, [uid]: { ...prev.modelOptions[uid], opacity: value } } }
        })
    }

    const handleColor = (value, uid) => {
        setState(prev => {
            return { ...prev, modelOptions: { ...prev.modelOptions, [uid]: { ...prev.modelOptions[uid], color: value } } }
        })
    }

    if (!Object.keys(state.modelOptions).length) {
        return null
    }
    return (
        <Flex sx={{ flexDirection: 'column', justifyContent: 'space-between', position: 'absolute', left: 2, top: 2, p: 3, width: '20rem', bg: 'rgba(33, 37, 41, 0.6)', borderRadius: '5px' }}>
            <Box>
                <Flex sx={{ alignItems: 'center', gap: 2, mb: 4 }}>
                    <IconButton sx={{ height: 'fit-content', cursor: 'pointer' }} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='white'><title>chevron-left-box</title><path d="M19,3H5A2,2 0 0,0 3,5V19C3,20.11 3.9,21 5,21H19C20.11,21 21,20.11 21,19V5A2,2 0 0,0 19,3M15.71,16.59L14.29,18L8.29,12L14.29,6L15.71,7.41L11.12,12L15.71,16.59Z" /></svg>
                    </IconButton>
                    <Heading sx={{ fontSize: ['1rem', '0.8rem'] }}>Painel de Controle</Heading>
                </Flex>
                <Flex sx={{ flexDirection: 'column' }}>
                    {Object.keys(state.modelOptions).map(i => (
                        <ModelControls key={i} uid={i} handleVisible={handleVisible} handleOpacity={handleOpacity} modelOptions={state.modelOptions[i]} handleColor={handleColor} />
                    ))}
                </Flex>
            </Box>

            <Box>

            </Box>
        </Flex>
    )
}

export default ControlPanel


const ModelControls = ({ uid, handleOpacity, handleVisible, modelOptions, handleColor }) => {
    const [showColorPicker, setShowColorPicker] = useState(false)

    return <Box sx={{ alignItems: 'center', justifyContent: 'center', overflow: 'auto', p: 2, bg: 'rgba(73, 80, 87, 0.7)', borderRadius: '4px', my: 1 }}>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2, }}>
            <Text sx={{ fontSize: [12, 14, 16] }}>{modelOptions.name.split(".")[0]}</Text>
            <Box sx={{}}>
                <Box onClick={() => setShowColorPicker(!showColorPicker)} sx={{ height: '1.4rem', width: '1.4rem', bg: modelOptions.color, borderRadius: '5px', cursor: 'pointer' }}></Box>
                {showColorPicker &&
                    <Box sx={{ position: 'absolute' }}>
                        <HexColorPicker color={modelOptions.color} onChange={(e) => handleColor(e, uid)} />
                    </Box>
                }
            </Box>
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton sx={{ cursor: 'pointer', height: '1rem', width: '1.rem' }}
                onClick={(e) => handleVisible(e, uid)}
            >
                {modelOptions.opacity < 0.1 ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='#adb5bd'><title>eye-off-outline</title><path d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z" /></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='#adb5bd'><title>eye-outline</title><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" /></svg>
                }
            </IconButton>
            <Slider sx={{ width: '80%' }} min={0} max={1} value={modelOptions.opacity} step={0.1} onChange={(e) => handleOpacity(e)} />

        </Flex>

    </Box>
}

const OpacitySlider = ({ handleOpacity, uid, value }) => {
    return <Flex sx={{ position: 'absolute', top: 0, left: 4, p: 3, height: '2rem', width: '10rem', bg: 'rgba(233, 236, 239, 0.2)', borderRadius: '5px', alignItems: 'center' }}>
        <Slider min={0} max={1} defaultValue={value} step={0.1} onChange={(e) => handleOpacity(e.target.value, uid)} />
    </Flex>
}

const ColorPicker = ({ color, setColor }) => (
    <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
        <HexColorPicker color={color} onChange={setColor} />
    </Box>)