// input string
const input = `

'this is a test my guf'
else if or and &&&
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
    'return'
]

const reserved_tokens = {
    ',' : 'COMMA',
    '=' : 'EQUAL',
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
    '}' : 'right-bracket'
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
                buffer = ''
                continue
            } else if (char === ' ') {
                tokens.push({
                    type: 'white-space'
                })
                buffer = ''
                continue
            } else if (reserved_words.findIndex(elem => elem === buffer) !== -1) {
                tokens.push({
                    type: reserved_words.find(elem => elem === buffer)
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

parse()
console.log(tokens)
