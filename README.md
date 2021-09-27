# worm-script
## Table of Contents
* Language Reference
  * [Constant Assignment](#constant)
  * [Functions](#functions)
  * [Conditionals](#conditional)
  * [Iterators](#iterator)
  * [Easy Mapping](#easymap)
  * [Array Indexing](#index)
  * [Try & Catch](#try)

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
- ... any javascript reserved words

## Constant assignment <a name="constant"/>
```
a = 5
```
This transpiles to `const a = 5` if there is no re-assignment otherwise `let a  = 5`

## Function assignment <a name="functions"/>
The default is always to return undefined or the last declared variable
### no parameters
```
foo = ()
```
This transpiles to `const foo = () => { return undefined }`
### parameters
```
foo = (
  @ a
  @ b
  a + b
)
```
or
```
foo = (
  @ a, b
  a + b
)
```
This transpiles to 
`const foo = (a, b) => { 
  const generated_id = a + b
  return genetrated_id
 }`
## Conditional Statements <a name="conditional"/>
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
## Iteration <a name="iterator"/>
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
 // code 
while expression
}
```
Transpiles to javascript do-while loop
## Easy map-filter <a name="easymap"/>
```
x = [ variable.x for variable in arr where variable.x > 5 ]
```
Transpiles to `const x = arr.filter( elem => elem.x > 5 ).map( elem => elem.x )`
## Array indexing <a name="index"/>
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
### Try/Catch <a name="try"/>
```
try {
 // code
 catch (
 // code
 )
}
```
