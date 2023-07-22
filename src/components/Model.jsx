import { useLoader, useThree } from '@react-three/fiber'
import React, { useContext, useEffect, useRef } from 'react'
import { FrontSide, MeshMatcapMaterial } from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { getColor } from './getColors'
import { ViewerContext } from '../App'
import { useTexture } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

//Matcap 4,9,8,10
const Model = ({ name, finalRender }) => {
    const isObj = name.split(".")[name.split(".").length - 1] === 'obj'
    const model = isObj ? useLoader(OBJLoader, name) : useLoader(STLLoader, name)

    const texture = useTexture('matcaps/matcap4.png')
    const { modelOptions, setModelOptions, state, setState } = useContext(ViewerContext)


    useEffect(() => {
        // setModelOptions(prev => ({ ...prev, [model.uuid]: { name, color: getColor(name), matcap: texture, opacity: 1, loaded: true, isObj: isObj } }))
        setState(prev => ({ ...prev, modelOptions: { ...prev.modelOptions, [model.uuid]: { name, color: getColor(name), matcap: texture, opacity: 1, loaded: true, isObj: isObj } } }))
        if (isObj) {
            model.traverse((mesh) => {
                mesh.material = new MeshMatcapMaterial({ color: getColor(name), matcap: texture, transparent: true, alphaTest: 0.1, opacity: 1 })
            })
        }
    }, [model, name, setModelOptions, setState, isObj, texture])

    useEffect(() => {
        if (isObj) {
            model.traverse((mesh) => {
                mesh.material.opacity = state.modelOptions[model.uuid]?.opacity
            })
        }
    }, [state.modelOptions[model.uuid]?.opacity, isObj, model])

    return state.modelOptions[model.uuid] && (
        <mesh
            key={model.uuid}
            scale={0.5}
            position={[-90, 100, 50]}
            rotation={[4.5, 0, 0]}
        >
            <primitive object={model} />
            <meshMatcapMaterial
                // matcap={modelOptions[model.uuid].matcap}
                transparent
                alphaTest={0.1}
                color={state.modelOptions[model.uuid].color}
                opacity={state.modelOptions[model.uuid].opacity}
            />
        </mesh >
    )
}

export default Model