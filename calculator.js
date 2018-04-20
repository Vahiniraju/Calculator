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
var checkhighprecedence = null;


function init()
{

}

for(var i=0; i < digits.length; i++)
{
    digits[i].addEventListener('click',storenumber);
}

for(var i=0;i< operator.length; i++)
{
    operator[i].addEventListener('click',checkprecedence)
}


function storenumber()
{  
    // 
    
    if(isLastinputNumber) 
    {
        number = number.concat(this.value);
    }    
    else
    {  
        number = this.value;
    }
    result.innerHTML =  number;
    isLastinputNumber = true;

}

function checkprecedence()
{
    if(new_operator)
    {
        if(high_precedence)
        {
            // if(new_operator == '*')
            new_value = calculate(new_operator,new_value,number);
            // new_value = number *  new_value;
            // else if(new_operator == '/')
            // new_value = new_value / number;

            samelevel = checkforsamepredencelevel(old_operator,this.value);
            if(samelevel)
            {
                old_value = calculate(this.value,old_value,new_value);
                // old_value = Number(old_value) + Number(new_value);
                old_operator = this.value;
                result.innerHTML = old_value;
                new_operator = null;
                new_value = null;
            }
            else
            {
                new_operator = this.value;
                result.innerHTML = new_value;
            }   
            samelevel = null; 
        }
    }
    else if(old_operator)
    {
        new_operator = this.value;
        new_value = number;
        checkhighprecedence = checkiflowpredence(old_operator,new_operator);
            if (!checkhighprecedence)
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
        checkhighprecedence = null;
    }
    else
    {
        if(old_value == null)
        {
            old_value = number;
        }
        else
        {
            new_value = number; 
        }
        old_operator = this.value;
    }
    isLastinputNumber = false;    
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

function checkforsamepredencelevel(first_operator, second_operator)
{
    if(operations[first_operator] == operations[second_operator])
     return true;
    else
     return false;
}

function checkiflowpredence(first_operator,second_operator)
{
    if(operations[first_operator] >= operations[second_operator])
        return true;
    else
        return false;
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