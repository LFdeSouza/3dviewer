import { useLoader, useThree } from '@react-three/fiber'
import React, { useContext, useEffect, useRef } from 'react'
import { FrontSide, MeshMatcapMaterial, Vector3, Box3, Euler } from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { getColor } from './getColors'
import { ViewerContext } from '../App'
import { useTexture } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'


//Matcap 4,9,8,10
const Model = ({ name, finalRender }) => {
    const modelRef = useRef()
    const isObj = name.split(".")[name.split(".").length - 1] === 'obj'
    const model = isObj ? useLoader(OBJLoader, name) : useLoader(STLLoader, name)

    const texture = useTexture('matcaps/matcap9.png')
    const { state, setState } = useContext(ViewerContext)

    useEffect(() => {
        setState(prev => ({
            ...prev,
            modelOptions: { ...prev.modelOptions, [model.uuid]: { name, color: getColor(name), matcap: texture, opacity: 1, loaded: true, isObj: isObj } },
            loaded: finalRender ? true : prev.loaded,
        }))
        if (isObj) {
            model.traverse((mesh) => {
                mesh.material = new MeshMatcapMaterial({ color: getColor(name), matcap: texture, transparent: true, alphaTest: 0.1, opacity: 1 })
            })
        }

    }, [model, name, setState, isObj, texture, finalRender,])

    useEffect(() => {
        if (isObj) {
            model.traverse((mesh) => {
                mesh.material.opacity = state.modelOptions[model.uuid]?.opacity
            })
        }
    }, [state.modelOptions[model.uuid]?.opacity, isObj, model, state.modelOptions])


    // useEffect(() => {
    //     modelRef.current?.traverse((child) => {
    //         const boundingBox = new Box3().setFromObject(modelRef.current);
    //         const modelCenter = boundingBox.getCenter(new Vector3());
    //         child.position.sub(modelCenter)
    //         console.log(child.position)
    //     })
    // },
    //     [modelRef.current, model])



    return state.modelOptions[model.uuid] && (
        <mesh
            ref={modelRef}
            key={model.uuid}
            scale={0.5}
        // position={[-49.5, 64.3, 49]}
        // rotation={[4.8, 0, 0]}
        >
            <primitive object={model} />
            <meshMatcapMaterial
                matcap={state.modelOptions[model.uuid].matcap}
                transparent
                alphaTest={0.1}
                color={state.modelOptions[model.uuid].color}
                opacity={state.modelOptions[model.uuid].opacity}
            />
        </mesh >
    )
}

export default Model