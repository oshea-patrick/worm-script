# worm-script

## reserved words
- if
- elif
- else
- case
- switch
- break
- continue
- do
- while
- try
- catch
- in
- where
- for

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
 // code
 }
 case 'case2' {
 // code
 }
}
```
This transpiles to the traditional javascript switch and case statement with breaks
## Iteration
### For loop
```
for x in obj {
 // code
}
```
Transpiles to javascript for-in loop if obj is a dict and for-of if obj is any other object
### While loop
```
while expression {
 // code
}
```
Transpiles to javascript while loop
### Do-while
```
do {

} while expression
```
Transpiles to javascript do-while loop
## Easy map-filter
```
x = [ variable.x for variable in arr where variable.x > 5 ]
```
Transpiles to `const x = arr.filter( elem => elem.x > 5 ).map( elem => elem.x )`
## Array indexing
```
a = 'Hello'
print(a[1])
```
This prints 'e' and transpiles to `console.log(a.substring(1,2))` if a is a string
```
a = [1,2,3]
print(a[1])
```
This prints '2' and transpiles to console.log(a[1])
