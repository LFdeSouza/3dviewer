
import { useEffect } from 'react'
import { MeshMatcapMaterial } from 'three'


const Model = ({ geometry, config }) => {
    useEffect(() => {
        if (config.isObj) {
            geometry.traverse((mesh) => {
                mesh.material = new MeshMatcapMaterial({ color: config.color, matcap: config.matcap, transparent: config.transparent, alphaTest: 0.1, opacity: config.opacity })
            })
        }
    }, [geometry, config.isObj, config.opacity, config.color])

    return (
        <mesh scale={0.5} >
            <primitive object={geometry} />
            <meshMatcapMaterial
                matcap={config.matcap}
                alphaTest={0.1}
                color={config.color}
                opacity={config.opacity}
                transparent={config.isObj ? config.transparent : true}
            />
        </mesh >
    )
}

export default Model