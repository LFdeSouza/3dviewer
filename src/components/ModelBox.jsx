import React, { useContext } from 'react'
import { Box, Flex, Button } from 'theme-ui'
import { ModelContext } from '../App'

const ModelBox = () => {

    const [options, setOptions] = useContext(ModelContext)
    const handleClick = (e) => {
        e.stopPropagation()
        setOptions(prev => {
            return { ...prev, items: { ...prev.items, [e.target.id]: { ...prev.items[e.target.id], color: 'green' } } }
        })
    }

    return (
        <Box sx={{ position: 'absolute', left: 2, top: 2, height: '30rem', width: '15rem', bg: 'rgba(233, 236, 239, 0.4)' }}>
            <Flex>
                {Object.keys(options) &&
                    Object.keys(options).map(i => (
                        <Button
                            key={i}
                            id={i}
                            onClick={handleClick}
                            sx={{ bg: 'blue' }} >{options[i].name}</Button>
                    ))
                }
            </Flex>
        </Box>
    )
}

export default ModelBox