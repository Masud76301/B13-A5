<b>Q1.  What is the difference between var, let, and const?</b>
<br>
Ans:  
 - const: when declaring the  name of a variable with const  that time the assigned value will not change further .. it is constant  
- let : when use ‘let’ that time this declared variable name is not use in future it only one time but assigning value will be change 
-var: var is an old method which is the same as ‘let’ but it is confusing .. when declaring a name with var  , letter this variable name is declared as another variable .

<b>Q2.What is the spread operator (...)?</b>
<br>
Ans:   
Spread operator use in array , when need expand value of array that time we use spread operator. It useful for pass argument in function <br>
<u> Example: </u>
<br>
<code>
function addition(a, b, c,d,e) {
  return a + b + c+d+e;
} <br>
const nums = [11,1 2, 23,25,26];<br>
sum(...nums); // no need use index value …it easy 
</code>


<b>Q3.What is the difference between map(), filter(), and forEach()?</b><br>
Ans: 
- map() : used for transform value and return new array
	 <br> <u>Example</U> <br>
     <code>
	    const numbers = [1,2,3];<br>
	    const doubled = numbers.map(num => num * 2);
    </code>

- filter() :when match the condition then select the array element and return a new array. 
<br> <u>Example</U> <br>
<code>
const numbers = [1, 2, 3, 4];<br>
const graterThenTwo = numbers.filter(num => num > 2 === 0); // [3,4]
</code>

- forEach() : it’s work as a like  For Loop  , when using forEach() it executes a function for every element of the array .
<br> <u>Example</U> <br>
<code>
const numbers = [1, 2, 3, 4];<br>
numbers.forEach(num =>  console.log(num * 2));
</code>

 	

<b> Q4.What is an arrow function? </b><br>
Ans:   
Arrow function is shortcut of function where not need to write function keyword and function name instead of use this  ‘=>’ sign
<br> <u>Example</U> <br>
<code>
function name () {
}
<br> // If we use arrow function <br>
const  name = () => { }
</code> <br>
It is very useful for one line code , it reduces lines of code.

<b> Q5. What are template literals? </b> <br>
Ans:  
- Instead of using quotes ("")  Other symbols is used it called backticks(``)
- It works with the same quotes (“”) but when we use quotes that time we only use for string.
- But this backticks not only for  using string but also insert dynamic variable ${} ,  multiple line string ..and more advantage which is not get in using quotes.
