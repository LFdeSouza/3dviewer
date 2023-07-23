import { useContext, useEffect, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3, Box3, Euler } from 'three'
import Model from './ModelOld'
import { ViewerContext } from '../App'

const ModelGroup = ({ models }) => {
    const groupRef = useRef()
    const { camera, scene } = useThree()
    const [rotationAngle, setRotationAngle] = useState(0);


    // const { state } = useContext(ViewerContext)
    useEffect(() => {
        const centerCameraOnModel = () => {
            if (groupRef.current) {
                const boundingBox = new Box3().setFromObject(groupRef.current);
                const modelCenter = boundingBox.getCenter(new Vector3());
                groupRef.current.position.sub(modelCenter)
                // console.log(groupRef.current.position)
                camera.lookAt(modelCenter);
                //         camera.updateProjectionMatrix();
                // groupRef.current.traverse((child) => {
                //     if (child.isMesh) {
                //         // var box = new Box3().setFromObject(child);
                //         // console.log(center)
                //         // var center = new Vector3();
                //         // box.getCenter(center);
                //         // console.log(center)
                //         // child.position.sub(center); // center the model
                //         // child.rotation.y = Math.PI;   // rotate the model
                //         // console.log(scene)

                //         // console.log(child.uuid)
                //         const boundingBox = new Box3().setFromObject(groupRef.current);
                //         const modelCenter = boundingBox.getCenter(new Vector3());
                //         child.position.sub(modelCenter)
                //         console.log(child.position)
                //         // Set the camera position to center the model
                //         // const distance = boundingBox.getSize(new Vector3()).length();
                //         // const offset = distance / Math.tan(Math.PI * camera.fov / 360);
                //         // camera.position.copy(modelCenter);
                //         // camera.position.z += offset;

                //         // Calculate the rotation to center the model
                //         // const modelCenterEuler = new Euler();
                //         // modelCenterEuler.setFromVector3(modelCenter, camera.rotation.order);
                //         // camera.rotation.copy(modelCenterEuler);

                //         camera.lookAt(modelCenter);
                //         camera.updateProjectionMatrix();
                //     }
                // })
            }
        }
        centerCameraOnModel()
    }, [models, camera, state.finalRender])

    return (
        <group ref={groupRef} >
            {models.map((i, idx) => (
                <Model key={idx} name={i} finalRender={idx === (models.length - 1)} />
            ))}
        </group>
    )
}

export default ModelGroup