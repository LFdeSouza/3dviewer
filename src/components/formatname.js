export function formatName(string) {
    let name = string
    if (string.includes("/")) {
        name = string.split("/").splice(1).join('')
    }


    return name.split('.')[0]
}