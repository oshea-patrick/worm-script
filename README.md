# worm-script

## Constant assignment
```
a = 5
```
This transpiles to `const a = 5` if there is no re-assignment otherwise `let a  = 5`

## Function assignment
The default is always to return undefined or the last declared variable
### no parameters
```
foo = ()
```
This transpiles to `const foo = () => { return undefined }`
### parameters
```
foo = (
  *a
  *b
  a + b
)
```
or
```
foo = (
  *a,b
  a + b
)
```
This transpiles to 
`const foo = (a, b) => { 
  const generated_id = a + b
  return genetrated_id
 }`
## Conditional Statements
### if elif else
```
if expression {
 // code
} elif expression {
 // code
} else {
 // code
}
```
This transpiles to the traditional javscript if / else if / and else
### switch case
```
switch expression {
 case 'case1' {
 
 }
 case 'case2' {
 
 }
}
```
This transpiles to the traditional javascript switch and case statement with breaks
