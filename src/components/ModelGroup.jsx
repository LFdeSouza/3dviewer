import { useContext, useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector3, Box3 } from 'three'
import Model from './Model'
import { ViewerContext } from '../App'

const ModelGroup = () => {
    const groupRef = useRef()
    const { camera } = useThree()

    const { state } = useContext(ViewerContext)

    const centerGroup = () => {
        const boundingBox = new Box3().setFromObject(groupRef.current);  //Create a box and calculate distance from object
        const modelCenter = boundingBox.getCenter(new Vector3());  //get center
        groupRef.current.position.sub(modelCenter) //reposition object
    }

    useEffect(() => {
        const centerCameraOnModel = () => {
            if (groupRef.current) {
                groupRef.current.rotation.x += 4.8 //Correct angle
                centerGroup()
                // camera.position.setZ(140) //get camera view farther from object
                // camera.lookAt(modelCenter);
            }
        }
        centerCameraOnModel()
    }, [camera])

    useEffect(() => {
        centerGroup()
        camera.position.set(state.camera.x, state.camera.y, state.camera.z)

        // camera.position.setX(state.camera.x)
        // camera.position.setY(state.camera.y)
        // camera.position.setZ(state.camera.z)
    }, [camera, state.camera])

    return (
        <group ref={groupRef} >
            {state.geometries.map((i, idx) => (
                <Model key={idx} geometry={i} config={state.modelOptions[i.uuid]} />
            ))}
        </group>
    )
}

export default ModelGroup