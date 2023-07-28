import React, { useContext } from 'react'
import { Flex, Image, Text } from 'theme-ui'
import mouseLeft from '../assets/mouse-left.png'
import mouseRight from '../assets/mouse-right.png'
import oneFinger from '../assets/finger-one.png'
import twoFinger from '../assets/finger-two.png'
import { ViewerContext } from '../App'

const Instrucions = () => {

    const { state } = useContext(ViewerContext)

    return (
        <Flex sx={{ position: 'absolute', bottom: ['1rem', '1rem'], left: ['1rem', '4rem'], alignItems: 'center', gap: [3, 4] }}>
            <Flex sx={{ alignItems: 'center' }}>
                <Image src={mouseLeft} sx={{ display: ['none', 'block'], height: ['1.3rem', '2.5rem'], width: ['1.3rem', '2.5rem'] }} />
                <Image src={oneFinger} sx={{ display: ['block', 'none'], height: ['1.3rem', '2.5rem'], width: ['1.3rem', '2.5rem'] }} />
                <Text sx={{ color: state.darkTheme ? '#f8f9fa' : '#212529' }}>Girar imagem</Text>
            </Flex>
            <Flex sx={{ alignItems: 'center' }}>
                <Image src={mouseRight} sx={{ display: ['none', 'block'], height: ['1.3rem', '2.5rem'], width: ['1.3rem', '2.5rem'] }} />
                <Image src={twoFinger} sx={{ display: ['block', 'none'], height: ['1.3rem', '2.5rem'], width: ['1.3rem', '2.5rem'] }} />
                <Text sx={{ color: state.darkTheme ? '#f8f9fa' : '#212529' }}>Mover imagem</Text>
            </Flex>
        </Flex>
    )
}

export default Instrucions