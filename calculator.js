var digits = document.getElementsByClassName('number');
var operator = document.getElementsByClassName('operator');
var clear = document.getElementById('clear');
var sign = document.getElementById('sign');
var evaluate = document.getElementById('display-value');
var decimal = document.getElementById('decimal');
var result = document.getElementById('result');
var operations = { '-' : 0, '+' : 0, '/': 1, '*':1};
var old_value = null;
var new_value = null;
var old_operator = null;
var new_operator = null;
var isLastinputNumber = false;
var high_precedence = false;
var samelevel = null;
var lowPrecedence = null;
var setdecimal = false;
var number = null;


for(var i=0; i < digits.length; i++)
{
    digits[i].addEventListener('click',storeNumber);
}

for(var i=0;i< operator.length; i++)
{
    operator[i].addEventListener('click',operatorPerform);
}

decimal.addEventListener('click',addDecimal);
evaluate.addEventListener('click',evaluateExpression);

clear.addEventListener('click',initialize);

function initialize()
{
    var old_value = null;
    var new_value = null;
    var old_operator = null;
    var new_operator = null;
    var isLastinputNumber = false;
    var high_precedence = false;
    var samelevel = null;
    var lowPrecedence = null;
    var setdecimal = false;
    var number = null;
    result.innerHTML = 0;
}


function storeNumber()
{  
    if(isLastinputNumber) 
    {
        number = number.concat(this.value);
    }    
    else
    { 
        number = this.value;
    }
    // if(number && number != '0')
    // {
        isLastinputNumber = true;
    // }
    result.innerHTML =  number;

}

function operatorPerform()
{
    if(isLastinputNumber)
    {
        if(new_operator)
        {
            onNewOperator(this.value);
        }
        else if(old_operator)
        {
            onOldOperator(this.value);
        }
        else
        {
            if(old_value == null)
                old_value = number;
            // else
            //     new_value = number; 
            old_operator = this.value;
        }
        isLastinputNumber = false;  
        setdecimal = false;  
    }
    else
    {
        if(new_operator)
        {
            new_operator = this.value;
        }
        else if(old_operator)
        {
            old_operator = this.value;
        }
    }
}



function calculate(operator,num1,num2)
{
    switch(operator)
    {
        case '+': 
            return Number(num1) + Number(num2);
            break;
        case '-':
            return Number(num1) - Number(num2);
            break;
        case '*':
            return Number(num1) * Number(num2);
            break;
        case '/':
            if(Number(num2) != 0)
            return Number(num1) / Number(num2);
            break;    
    }
}

function checkIfSameLevel(first_operator, second_operator)
{
    if(operations[first_operator] == operations[second_operator])
     return true;
    else
     return false;
}

function checkIfLowPredence(first_operator,second_operator)
{
    if(operations[first_operator] >= operations[second_operator])
        return true;
    else
        return false;
}


function addDecimal()
{
    if(!setdecimal)
    {
        if(isLastinputNumber)
        {
            number = number.concat(this.value);
        }
        else
        {
            number = '0'.concat(this.value);
        }
        isLastinputNumber= true;
        setdecimal = true;
        result.innerHTML =  number;
    }
}


function evaluateExpression()
{
    if(old_value != null)
    {
        if(new_operator)
        {
            output = calculate(new_operator,new_value,number);
            output = calculate(old_operator,old_value,output);
            old_operator = new_operator;
        }
        else 
        {
            output = calculate(old_operator,old_value,number);
        }
        new_operator = null;
        old_value = output;
        result.innerHTML =  output;
      
    }
}

function onNewOperator(value)
{
    if(high_precedence)
    {
        new_value = calculate(new_operator,new_value,number);
        samelevel = checkIfSameLevel(old_operator,value);
        if(samelevel)
        {
            old_value = calculate(value,old_value,new_value);
            old_operator = value;
            result.innerHTML = old_value;
            new_operator = null;
            new_value = null;
        }
        else
        {
            new_operator = value;
            result.innerHTML = new_value;
        }   
        samelevel = null; 
    }
}

function onOldOperator(value)
{
    new_operator = value;
    new_value = number;
    lowPrecedence = checkIfLowPredence(old_operator,new_operator);
    if (!lowPrecedence)
    {   
        high_precedence = true;
    }
    else
    {
        high_precedence = false;
        old_value = calculate(old_operator,old_value,new_value);
        old_operator = new_operator;
        new_operator = null;
        new_value = null;
        result.innerHTML = old_value;
    }
    lowPrecedence = null;
}
/*
if(this.value == '*')
       {
           old_value = old_value.to_i * new_value.to_i;
         result.innerHTML =  old_value;
       } 
       else if(this.value == '/')
       {
           old_value = old_value.to_i * new_value.to_i
           result.innerHTML =  old_value;
       }
       else{*/