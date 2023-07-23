import { useContext, useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector3, Box3 } from 'three'
import Model from './Model'
import { ViewerContext } from '../App'

const ModelGroup = () => {
    const groupRef = useRef()
    const { camera } = useThree()

    const { state } = useContext(ViewerContext)
    useEffect(() => {
        const centerCameraOnModel = () => {
            if (groupRef.current) {
                groupRef.current.rotation.x += 4.8 //Correct angle
                const boundingBox = new Box3().setFromObject(groupRef.current);  //Create a box and calculate distance from object
                const modelCenter = boundingBox.getCenter(new Vector3());  //get center
                groupRef.current.position.sub(modelCenter) //reposition object
                camera.position.setZ(140) //get camera view farther from object
            }
        }
        centerCameraOnModel()
    }, [camera])

    return (
        <group ref={groupRef} >
            {state.geometries.map((i, idx) => (
                <Model key={idx} geometry={i} config={state.modelOptions[i.uuid]} />
            ))}
        </group>
    )
}

export default ModelGroup