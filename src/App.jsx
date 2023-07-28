import { useState, useEffect, createContext } from 'react'
import { Flex, Image } from 'theme-ui'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { getColor } from './components/getColors'
import ControlPanel from './components/ControlPanel'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ModelGroup from './components/ModelGroup'
import { TextureLoader } from 'three'
import ViewBox from './components/ViewBox'
import Instrucions from './components/Instrucions'
import ButtonMenu from './components/ButtonMenu'

export const ViewerContext = createContext()

function App() {
  // const [files, setFiles] = useState(['OSSO.stl'])
  // const [files, setFiles] = useState(['AORTA.stl', 'TROMBO.stl'])
  // const [files, setFiles] = useState(['Artery.obj', 'High tumor.obj', 'IVC.obj', 'Portal.obj', 'PV1.obj', 'PV2.obj', 'PV3.obj', 'PV4.obj', 'Vein.obj'])
  // const [files, setFiles] = useState(['torax/Arteria.obj',
  //   'torax/Bronquio.obj',
  //   'torax/LID.obj',
  //   'torax/LM.obj',
  //   'torax/LSD S1.obj',
  //   'torax/LSD S2.obj',
  //   'torax/LSD S3.obj',
  //   'torax/Tumor.obj',
  //   'torax/Veia.obj',
  // ])
  const [files, setFiles] = useState(['liver/High tumor.obj',
    'liver/IVC.obj',
    'liver/Liver.obj',
    'liver/Portal.obj',
    'liver/Vein.obj'
  ])

  const [state, setState] = useState({
    geometries: {},
    modelOptions: {},
    loaded: false,
    darkTheme: true,
    camera: { x: 0, y: 8.572527594031473e-15, z: 140, reset: false }
  })

  const loadModels = async (files) => {
    const type = files[0].split(".")[files[0].split(".").length - 1]
    const textureLoader = new TextureLoader()
    const texture = await textureLoader.loadAsync('matcaps/matcap14.png')
    //default 9 or 20 + 14
    const geometries = await Promise.all(
      files.map(async (file) => {
        try {
          const loader = type === 'obj' ? new OBJLoader : new STLLoader
          const geometry = await loader.loadAsync(file)
          geometry.name = file.split("/").join('').replace(/#/, '')
          return geometry;
        } catch (err) {
          console.log(err);
        }
      })
    );
    const modelOptions = geometries.reduce((result, i) => {
      result[i.uuid] = {
        name: i.name,
        color: getColor(i.name),
        matcap: texture,
        opacity: 1,
        loaded: true,
        isObj: i.name.split(".")[i.name.split(".").length - 1] === 'obj'
      }
      return result
    }, {})
    setState(prev => ({ ...prev, geometries, modelOptions }));
  };

  useEffect(() => {
    loadModels(files)
  }, [files])


  const darkBg = 'radial-gradient(circle, rgba(71,71,91,1) 0%, rgba(47,49,70,1) 100%);'
  const lightBg = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(224,224,224,1) 100%, rgba(0,212,255,1) 100%)'

  return (
    <ViewerContext.Provider value={{ state, setState }} >
      <Flex p={0} sx={{ position: 'relative', background: state.darkTheme ? darkBg : lightBg, width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <Flex sx={{ position: 'absolute', top: 3, right: 0, flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Image src="bmk.png" sx={{ height: ['4rem', '5rem', '10rem'] }} />
        </Flex>
        <Canvas>
          {!!state.geometries.length &&
            <ModelGroup />
          }
          <OrbitControls enableDamping={false} enablePan={false} />
        </Canvas>
        <ControlPanel />
        {/* <ViewBox /> */}
        <ButtonMenu />
      </Flex>
    </ViewerContext.Provider >
  )
}

export default App
