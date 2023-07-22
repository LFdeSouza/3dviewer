import { useState, useEffect, useContext, createContext } from 'react'
import { Flex, Box, Image, Text } from 'theme-ui'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import Viewer from './components/Viewer'
import { getColor } from './components/getColors'
import ControlPanel from './components/ControlPanel'
import { useLoader, Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import ModelGroup from './components/ModelGroup'

export const ViewerContext = createContext()

function App() {
  const [darkTheme, setDarkTheme] = useState(true)
  const [geometry, setGeometry] = useState(['Artery.obj', 'High tumor.obj', 'IVC.obj', 'Portal.obj', 'PV1.obj', 'PV2.obj', 'PV3.obj', 'PV4.obj', 'Vein.obj'])
  const [modelOptions, setModelOptions] = useState({})
  const [state, setState] = useState({
    geometries: [],
    modelOptions: {},
    loaded: false,
    darkTheme: true
  })

  const darkBg = 'radial-gradient(circle, rgba(71,71,91,1) 0%, rgba(47,49,70,1) 100%);'
  const lightBg = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(224,224,224,1) 100%, rgba(0,212,255,1) 100%)'

  return (
    <ViewerContext.Provider value={{ modelOptions, setModelOptions, state, setState }} >
      <Flex p={0} sx={{ position: 'relative', background: darkTheme ? darkBg : lightBg, width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <Flex sx={{ position: 'absolute', top: 3, right: 0, flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Image src="bmk.png" sx={{ height: ['4rem', '5rem', '10rem'] }} />
        </Flex>
        <Canvas>
          <ModelGroup models={geometry} />
          {/* <ambientLight /> */}
          {/* <Environment preset='city' /> */}
          {/* <Environment files='industrial.hdr' /> */}
          {/* <pointLight position={[10, 10, 10]} castShadow /> */}
          <OrbitControls enableDamping={false} />
        </Canvas>
        <ControlPanel />
      </Flex>
    </ViewerContext.Provider>
  )
}

export default App
