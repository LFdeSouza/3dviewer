
import { ViewerContext } from '../App'
import React, { useEffect } from 'react'
import { BackSide, DoubleSide, FrontSide, MeshMatcapMaterial } from 'three'


const Model = ({ geometry, config }) => {

    const isObj = geometry.name.split(".")[geometry.name.split(".").length - 1] === 'obj'

    useEffect(() => {
        if (isObj) {
            geometry.traverse((mesh) => {
                mesh.material = new MeshMatcapMaterial({ color: config.color, matcap: config.matcap, transparent: true, alphaTest: 0.1, opacity: config.opacity })
            })
        }
    }, [geometry, isObj, config.opacity, config.color])


    return (
        <mesh scale={0.5} >
            <primitive object={geometry} />
            <meshMatcapMaterial
                matcap={config.matcap}
                transparent
                alphaTest={0.1}
                color={config.color}
                opacity={config.opacity}
            />
        </mesh >
    )
}

export default Model