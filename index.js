// input string
const input = ` j = [1,2,3]
for iter in j {
    for k in iter {
        if 5 > 4 {

        } else {

        }
    }
}
`
// tokens
const QUOT1 = '"'
const QUOT2 = "'"
const QUOT3 = '`'
const reserved_words = [
    'true',
    'false',
    'for',
    'in',
    'where',
    'or',
    'and',
    'is',
    'isnt',
    'while',
    'if',
    'elif',
    'else',
    'return',
    'new',
    'async',
    'await'
]

const reserved_tokens = {
    ',' : 'comma',
    '=' : 'equal',
    '(' : 'left-paren',
    ')' : 'right-paren',
    '@' : 'at',
    '[' : 'left-square',
    ']' : 'right-square',
    '.' : 'period',
    '*' : 'star',
    '/' : 'slash',
    '+' : 'plus',
    '-' : 'minus',
    '^' : 'carrot',
    '%' : 'modulus',
    '&' : 'amp',
    '|' : 'line',
    '<' : 'less-than',
    '>' : 'grtr-than',
    '{' : 'left-bracket',
    '}' : 'right-bracket',
    ':' : 'dict-sep'
}


const tokens = []

const lastToken = tokens.length > 0 ? tokens[tokens.length - 1] : undefined

// is-white-space
const isWhiteSpace = () => {

}

// parse method
const parse = () => {
    let buffer = ''
    let line = 1
    let inString = false

    for (const char of input) {
        const emptyBuffer = buffer.length === 0
        // keep adding!
        if (inString) {
            if (char === '\n') {
                line++
                continue
            }
            if (char === QUOT1 && buffer[0] === QUOT1) {
                tokens.push({
                    type: 'STRING',
                    value: buffer.substring(1)
                })
                inString = false
                buffer = ''
                continue
            } else if (char === QUOT2 && buffer[0] === QUOT2) {
                tokens.push({
                    type: 'STRING',
                    value: buffer.substring(1)
                })
                inString = false
                buffer = ''
                continue
            } else if (char === QUOT3 && buffer[0] === QUOT3) {
                tokens.push({
                    type: 'STRING',
                    value: buffer.substring(1)
                })
                inString = false
                buffer = ''
                continue
            }
            buffer += char
        } // fancy logic
        else {
            buffer += char
            // string
            if (emptyBuffer && (char === QUOT1 || char === QUOT2 || char === QUOT3)) {
                inString = true
                continue
            } else if (char === '\n') {
                line++
                if (buffer.length > 0) {
                    if (new RegExp('[0-9]+(?<=[0-9])(\.[0-9]*)?').test(buffer)) {
                        tokens.push({
                            type: 'number',
                            value: parseFloat(buffer)
                        })
                    } else if (new RegExp('[a-zA-Z_$][^\\w$]*').test(buffer)) {
                        tokens.push({
                            type: 'constant',
                            value: buffer
                        })
                    }
                }
                buffer = ''
                tokens.push({
                    type: 'white-space'
                })
                continue
            } else if (char === ' ') {
                // other charcaters besides space at end
                if (buffer.length > 1) {
                    const othValue = buffer.substring(0, buffer.length-1)
                    if (new RegExp('[0-9]+(?<=[0-9])(\.[0-9]*)?').test(othValue)) {
                        tokens.push({
                            type: 'number',
                            value: parseFloat(othValue)
                        })
                    } else if (new RegExp('[a-zA-Z_$][^\\w$]*').test(othValue)) {
                        tokens.push({
                            type: 'constant',
                            value: othValue
                        })
                    }
                }
                tokens.push({
                    type: 'white-space'
                })
                buffer = ''
                continue
            } else if (char === ',') {
                // other charcaters besides comma at end
                if (buffer.length > 1) {
                    const othValue = buffer.substring(0, buffer.length-1)
                    if (new RegExp('[0-9]+(?<=[0-9])(\.[0-9]*)?').test(othValue)) {
                        tokens.push({
                            type: 'number',
                            value: parseFloat(othValue)
                        })
                    } else if (new RegExp('[a-zA-Z_$][^\\w$]*').test(othValue)) {
                        tokens.push({
                            type: 'constant',
                            value: othValue
                        })
                    }
                }
                tokens.push({
                    type: 'comma'
                })
                buffer = ''
                continue
            } else if (reserved_words.findIndex(elem => elem === buffer) !== -1) {
                tokens.push({
                    type: reserved_words.find(elem => elem === buffer)
                })
                buffer = ''
                continue
            } else if (char in reserved_tokens) {
                if (buffer.length > 1) {
                    const othValue = buffer.substring(0, buffer.length-1)
                    // in a number atm
                    if (new RegExp('[0-9]+').test(othValue)) {
                        continue
                    }
                    else if (new RegExp('[0-9]+(?<=[0-9])(\.[0-9]*)?').test(othValue)) {
                        tokens.push({
                            type: 'number',
                            value: parseFloat(othValue)
                        })
                    } else if (new RegExp('[a-zA-Z_$][^\\w$]*').test(othValue)) {
                        tokens.push({
                            type: 'constant',
                            value: othValue
                        })
                    }
                }
                tokens.push({
                    type: reserved_tokens[char]
                })
                buffer = ''
                continue
            } else if (buffer in reserved_tokens) {
                tokens.push({
                    type: reserved_tokens[buffer]
                })
                buffer = ''
                continue
            }
        }
    }
    if (inString) {
        console.log(`Unclosed string near line ${line}`)
    }
    // push EOF to end of tokens
    tokens.push({
        type: 'EOF'
    })
}

const interpret = () => {
    while (tokens.length > 0) {
        console.log('yolo')
    }
}

parse()
interpret()
