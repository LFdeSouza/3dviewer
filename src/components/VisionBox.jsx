import React, { useContext } from 'react'
import { Box, Button } from 'theme-ui'
import { ModelContext } from '../App'

const VisionBox = ({ }) => {
    const options = useContext(ModelContext)

    return (
        <Box sx={{ position: 'absolute', color: 'white', bottom: ['7rem', 10], right: 10 }}>
            <Box sx={{ width: ['8rem', '12rem'], height: ['10rem', '14rem'], bg: 'rgba(233, 236, 239, 0.4)', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                <Box>
                    {/* {!!models.length &&
                        models.map((i, idx) => (
                            <Button sx={{ display: 'block', }} key={idx} value={idx} onClick={(e) => handleClick(e)}>{i.name}</Button>
                        ))} */}
                </Box>
            </Box>
        </Box>
    )
}

export default VisionBox