import { useEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector3, Box3, Euler, MeshStandardMaterial } from 'three'

const ObjModel = ({ obj, color, opacity }) => {
    const groupRef = useRef()
    const { camera } = useThree()

    useEffect(() => {
        // Function to center the camera on the loaded model
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
    }, [obj, camera])

    useEffect(() => {
        obj.traverse((mesh) => {
            mesh.material = new MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.1, transparent: true, opacity })
        })
    }, [opacity, obj])

    return (
        <group ref={groupRef}>
            <mesh
                scale={0.5}
                position={[-90, 100, 50]}
                rotation={[4.5, 0, 0]}
            >
                <primitive object={obj} />
                <meshBasicMaterial color={color} roughness={0.8} metalness={0.1} transparent={true} opacity={opacity} />
            </mesh>
        </group>
    )
}

export default ObjModel