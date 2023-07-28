import { useContext, useState } from 'react'
import { Box, Button, Flex } from 'theme-ui'
import { ViewerContext } from '../App'
import { HexColorPicker } from 'react-colorful'
import Acordeon from './Acordeon'
import { useThree } from '@react-three/fiber'

const ViewBox = () => {

    const [isOpen, setIsOpen] = useState(false)

    const { state, setState } = useContext(ViewerContext)
    const handleRotation = (side) => {
        //front
        if (side === 'front') {
            setState(prev => ({ ...prev, camera: { x: 0, y: 8.572527594031473e-15, z: 140 } }))
        }
        //back
        if (side === 'back') {
            setState(prev => ({ ...prev, camera: { x: 0, y: 8.572527594031473e-15, z: -140 } }))
        }

        //left
        if (side === 'left') {
            setState(prev => ({ ...prev, camera: { x: -140, y: 8.572527594031473e-15, z: 15.734688802032885 } }))
        }

        //right
        if (side === 'right') {
            setState(prev => ({ ...prev, camera: { x: 140, y: 0.9153378521075906, z: 34.64736526301856 } }))
        }
        //upper
        if (side === 'upper') {
            setState(prev => ({ ...prev, camera: { x: 0, y: 140, z: 0.008974715007114388 } }))
        }
        //bottom
        if (side === 'bottom') {
            setState(prev => ({ ...prev, camera: { x: 0, y: -140, z: 0.008974715007114388 } }))
        }
        //reset
        if (side === 'reset') {
            console.log('dser')
            setState(prev => ({ ...prev, camera: { x: 0, y: 8.572527594031473e-15, z: 140, reset: true } }))
        }

    }

    return (
        <Box sx={{ position: 'absolute', bottom: 2, right: 2, gap: 1, p: 3, }}>
            <Acordeon name='Visão'>
                <Flex sx={{ flexDirection: 'column', alignContent: 'center', justifyContent: 'center', }}>
                    <Button sx={{ bg: 'rgba(33, 37, 41, 0.6)', display: 'block', mb: 1, cursor: 'pointer' }} onClick={() => handleRotation('front')}>Frontal</Button>
                    <Button sx={{ bg: 'rgba(33, 37, 41, 0.6)', display: 'block', mb: 1, cursor: 'pointer' }} onClick={() => handleRotation('upper')}>Superior</Button>
                    <Button sx={{ bg: 'rgba(33, 37, 41, 0.6)', display: 'block', mb: 1, cursor: 'pointer' }} onClick={() => handleRotation('bottom')}>Inferior</Button>
                    <Button sx={{ bg: 'rgba(33, 37, 41, 0.6)', display: 'block', mb: 1, cursor: 'pointer' }} onClick={() => handleRotation('left')}>Esquerda</Button>
                    <Button sx={{ bg: 'rgba(33, 37, 41, 0.6)', display: 'block', mb: 1, cursor: 'pointer' }} onClick={() => handleRotation('right')}>Direita</Button>
                </Flex>
            </Acordeon>
        </Box>
    )
}

export default ViewBox