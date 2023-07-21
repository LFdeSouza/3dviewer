export function getColor(name) {

    return name.includes('AORTA') ? "#CC3300" :
        name.includes('ARTERIA') ? "#FF0000" :
            name.includes('CVI') ? "#6478FA" :
                name.includes('VEIA') ? "#92A1FF" :
                    name.includes('PORTA') ? "#FA87F5" :
                        name.includes('OSSO') ? "#C9C9C9" :
                            name.includes('CALCIO') ? "#FFFFFF" :
                                name.includes('METAL1') ? "#1E43AA" :
                                    name.includes('METAL2') ? "#0A64FF" :
                                        name.includes('TUMOR') ? "#C45911" :
                                            name.includes('CISTO') ? "#538135" :
                                                name.includes('TRAQUEIA') ? "#538135" :
                                                    name.includes('COLON') ? "#F7CAAC" :
                                                        name.includes('INTESTINO') ? "#FFE599" :
                                                            name.includes('TROMBO') ? "#1F4E79" :
                                                                name.includes('RIM') ? "#FF9999" :
                                                                    name.includes('FIGADO') ? "#CC0000" :
                                                                        name.includes('ESOFAGO') ? "#F4B083" :
                                                                            name.includes('ORGAO1') ? "#CC3300" :
                                                                                name.includes('ORGAO2') ? "#00CC00" :
                                                                                    name.includes('TECIDO1') ? "#BF8F00" :
                                                                                        name.includes('TECIDO2') ? "#008080" :
                                                                                            ' '

}