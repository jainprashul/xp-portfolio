// generate a uuid with given length and radix (default is 32) 
export function uuid(length = 12, radix = 36) {
    return Array.from({ length }, () => Math.floor(Math.random() * radix).toString(radix)).join('')
}


