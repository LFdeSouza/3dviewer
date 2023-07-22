import { useContext, useEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector3, Box3, Euler } from 'three'
import Model from './Model'
import { ViewerContext } from '../App'

const ModelGroup = ({ models }) => {
    const groupRef = useRef()
    const { camera } = useThree()

    const { modelOptions } = useContext(ViewerContext)
    useEffect(() => {
        const centerCameraOnModel = () => {
            if (groupRef.current) {
                groupRef.current.traverse((child) => {
                    if (child.isMesh) {
                        const boundingBox = new Box3().setFromObject(child)
                        const modelCenter = boundingBox.getCenter(new Vector3())

                        // Set the camera position to center the model
                        const distance = boundingBox.getSize(new Vector3()).length()
                        const offset = distance / Math.tan(Math.PI * camera.fov / 360)
                        camera.position.copy(modelCenter)
                        camera.position.z += offset

                        // Calculate the rotation to center the model
                        const modelCenterEuler = new Euler()
                        modelCenterEuler.setFromVector3(modelCenter, camera.rotation.order)
                        camera.rotation.copy(modelCenterEuler)

                        camera.lookAt(modelCenter)
                        camera.updateProjectionMatrix()
                    }
                })
            }
        }
        centerCameraOnModel()
    }, [models, camera, modelOptions])

    return (
        <group ref={groupRef} >
            {models.map((i, idx) => (
                <Model key={idx} name={i} finalRender={idx === (models.length - 1)} />
            ))}
        </group>
    )
}

export default ModelGroup