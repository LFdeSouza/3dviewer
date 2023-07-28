
import { ViewerContext } from '../App'
import React, { useEffect } from 'react'
import { BackSide, DoubleSide, FrontSide, MeshMatcapMaterial, MeshBasicMaterial, MeshStandardMaterial } from 'three'


const Model = ({ geometry, config }) => {

    const isObj = geometry.name.split(".")[geometry.name.split(".").length - 1] === 'obj'

    useEffect(() => {
        if (isObj) {
            geometry.traverse((mesh) => {
                mesh.material = new MeshStandardMaterial({ color: config.color, roughness: 0.9, metalness: 0.1, transparent: true, alphaTest: 0.1, opacity: config.opacity })
            })
        }
    }, [geometry, isObj, config.opacity, config.color])


    return (
        <mesh scale={0.5} >
            <primitive object={geometry} />
            <meshStandardMaterial
                side={DoubleSide}
                transparent
                roughness={0.9}
                metalness={0.1}
                alphaTest={0.1}
                color={config.color}
                opacity={config.opacity}
            />
        </mesh >
    )
}

export default Model