import { useState, useEffect, useContext, createContext } from 'react'
import { Flex, Box, Image, Text } from 'theme-ui'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import Viewer from './components/Viewer'
import { getColor } from './components/getColors'
import ModelBox from './components/ModelBox'

export const ModelContext = createContext()

function App() {

  const [darkTheme, setDarkTheme] = useState(true)
  const [models, setModels] = useState([])
  const [modelConfig, setModelConfig] = useState({})

  const darkBg = 'radial-gradient(circle, rgba(71,71,91,1) 0%, rgba(47,49,70,1) 100%);'
  const lightBg = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(224,224,224,1) 100%, rgba(0,212,255,1) 100%)'


  useEffect(() => {
    const models = []
    let config = {}

    let stlLoader = new STLLoader()
    stlLoader.load('AORTA.stl', (model) => {
      config[model.uuid] = { visible: true, name: 'AORTA', color: getColor('AORTA.stl'), opacity: 1, }
      // config = { ...config, [model.uuid]: { visible: true, name: 'AORTA', color: getColor('AORTA.stl'), opacity: 1 } }
      models.push(model)
    })
    stlLoader.load('TROMBO.stl', (model) => {
      config[model.uuid] = { visible: true, name: 'TROMBO', color: getColor('TROMBO.stl'), opacity: 1 }
      // config = { ...config, [model.uuid]: { visible: true, name: 'AORTA', color: getColor('AORTA.stl'), opacity: 1 } }
      models.push(model)
    })

    // const objLoader = new OBJLoader()
    // objLoader.load('COLON_EBD.obj', (model) => {
    //   setObj(model)
    // })

    setModels(models)
    setModelConfig(config)
  }, [])


  return (
    <ModelContext.Provider value={[modelConfig, setModelConfig]} >
      <Flex p={0} sx={{ position: 'relative', background: darkTheme ? darkBg : lightBg, width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <Flex sx={{ position: 'absolute', top: 3, right: 0, flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Image src="bmk.png" sx={{ height: ['5rem', '8rem', '10rem'] }} />
          <Text>Versão: 3.0</Text>
        </Flex>
        <Viewer models={models} />
        {!!Object.keys(modelConfig).length &&
          <ModelBox />
        }
      </Flex>
    </ModelContext.Provider>
  )
}

export default App
