import { useState, useEffect, useContext } from 'react'
import { Flex, Box, Image, Text } from 'theme-ui'
import { Canvas } from '@react-three/fiber'
import StlModel from './StlModel'
import { Environment, OrbitControls } from '@react-three/drei'
import ObjModel from './ObjModel'
import VisionBox from './VisionBox'


const Viewer = ({ models }) => {
    return (
        <>
            <Canvas>
                {models &&
                    <StlModel models={models} />
                }
                <ambientLight intensity={0.2} />
                {/* <Environment preset='city' /> */}
                <Environment files='industrial.hdr' />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls enableDamping={false} />
            </Canvas>
            {/* <VisionBox /> */}
        </>

    )
}

export default Viewer