import { useContext, useEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector3, Box3, Euler } from 'three'
import { ModelContext } from '../App'

const StlModel = ({ models }) => {
    const groupRef = useRef()
    const { camera } = useThree()

    const [options, setOptions] = useContext(ModelContext)

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
    }, [models, camera])

    const handleClick = (e, id) => {
        e.stopPropagation()
        setOptions(prev => {
            return { ...prev, [id]: { ...prev[id], color: `green` } }
        })
    }
    return (
        <group ref={groupRef} >
            {models.map((i) => (
                <mesh
                    onClick={(e) => handleClick(e, i.uuid)}
                    key={i.uuid}
                    scale={0.5}
                    position={[-90, 100, 50]}
                    rotation={[4.5, 0, 0]}>
                    <primitive object={i} />
                    <meshStandardMaterial
                        color={options[i.uuid].color}
                        roughness={options[i.uuid].roughness}
                        metalness={options[i.uuid].metalness}
                        transparent={true}
                        opacity={options[i.uuid].opacity}
                        visible={options[i.uuid].visible}
                    />
                </mesh>
            ))}
        </group>
    )
}

export default StlModel