export function getColor(name) {
    name = name.toUpperCase()
    return name.includes('AORTA') || name.includes('IVC') ? "#CC3300" :
        name.includes('ARTERIA') || name.includes('ARTERY') ? "#FF0000" :
            name.includes('CVI') ? "#6478FA" :
                name.includes('VEIA') || name.includes('VEIN') ? "#92A1FF" :
                    name.includes('PORTA') || name.includes('PORTAL') ? "#FA87F5" :
                        name.includes('OSSO') ? "#C9C9C9" :
                            name.includes('CALCIO') ? "#FFFFFF" :
                                name.includes('METAL1') ? "#1E43AA" :
                                    name.includes('METAL2') ? "#0A64FF" :
                                        name.includes('TUMOR') || name.includes('toraxTumor') ? "#C45911" :
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
                                                                                        name.includes('PV1') || name.includes('LID') ? "#6EFFB7" :
                                                                                            name.includes('PV2') || name.includes('LM') ? "#A46DCe" :
                                                                                                name.includes('PV3') || name.includes('toraxLSD S1') ? "CEFFB7" :
                                                                                                    name.includes('PV4') || name.includes('toraxLSD S2') ? "FA9DDF" :
                                                                                                        name.includes('PV5') || name.includes('toraxLSD S3') ? "#FF5733" :
                                                                                                            name.includes('PV6') ? "#F3FF6D" :
                                                                                                                name.includes('PV7') ? "#71FAFA" :
                                                                                                                    randomColor()

}

function randomColor() {
    const colors = ["#6EFFB7",
        "#A46DCe",
        "#CEFFB7",
        "#FA9DDF",
        "#FF5733",
        "#F3FF6D",
        "#71FAFA",
    ]
    const random = Math.floor(Math.random() * 6)
    return colors[random]
}