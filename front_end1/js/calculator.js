var button=document.getElementsByClassName('button');
var display=document.getElementById('display');
var operand1=0;
var operand2=null;
var operator=null;
display.innerText='0';
console.log('hello');


for(var i=0;i<button.length;i++){

    button[i].addEventListener('click',function(){
        
     var value = this.getAttribute('data-value');

      if(value == '+' || value == '-' || value == '/'  || value == '*')
      {
             operator=value;
             operand1=parseFloat(display.textContent);
             display.innerText='0';
             console.log('hello');
      }

    else if(value=='=') 
    {
       operand2=parseFloat(display.textContent);
       display.innerText=eval(operand1+operator+operand2);
       operand1=display.textContent;
    }
    else if (value=="AC")
    {
        operand1=0;
        operand2=null;
        operator=null;
        display.innerText='0';

    }
    else if (value=="%")
    {
        if(display.innerText!='0' && display.innerText.length==1){
           display.innerText='0';
        }

        else if(display.innerText!='0')
        {
            display.innerText=display.innerText.substr(0,display.innerText.length-1);
        }

    }

    else if (value=="+/-")
    {
        if(display.innerText[0]=='-')
        {
           // console.log(display.innerText[0]);
           display.innerText= display.innerText.substr(1);
        }
        else{
         display.innerText='-'+display.innerText;
        }
    }
    else{
            if(display.textContent=='0')
            {
                display.innerText='';
            }
            if(value!='.')
            {
            display.innerText+=value;
            }
            else
            {
                var w=display.innerText;
                k=display.innerText.includes('.');
                if(k){
                        display.innerText='Error INVALID MOVE';
                        setTimeout(function(){
                            display.innerText=w;
                        },3000);
                     }
                else
                {
                    display.innerText+=value;
                }
            }

    }

    });

}


document.addEventListener('keypress',function(event){
    //console.log(event.keyCode);
    if((event.keyCode>41 && event.keyCode<58 && event.keyCode!=44) || event.keyCode==13 || event.keyCode==61)
    {
   var value=String.fromCharCode(event.keyCode);
   //console.log(event.keyCode);
      if(value == '+' || value == '-' || value == '/'  || value == '*')
      {
             operator=value;
             operand1=parseFloat(display.textContent);
             display.innerText='0';
             console.log('hello');
      }

    else if(value=='=' || event.keyCode==13 || event.keyCode==61 ) 
    {
       operand2=parseFloat(display.textContent);
       display.innerText=eval(operand1+operator+operand2);
       operand1=display.textContent;
    }
    else if (value=="AC")
    {
        operand1=0;
        operand2=null;
        operator=null;
        display.innerText='0';

    }
    else if (value=="%")
    {
        if(display.innerText!='0' && display.innerText.length==1){
           display.innerText='0';
        }

        else if(display.innerText!='0' || event.keyCode==72)
        {
            display.innerText=display.innerText.substr(0,display.innerText.length-1);
        }

    }

    else if (value=="+/-")
    {
        if(display.innerText[0]=='-')
        {
           // console.log(display.innerText[0]);
           display.innerText= display.innerText.substr(1);
        }
        else{
         display.innerText='-'+display.innerText;
        }
    }
    else{
            if(display.textContent=='0')
            {
                display.innerText='';
            }
            if(value!='.')
            {
            display.innerText+=value;
            }
            else
            {
                var w=display.innerText;
                k=display.innerText.includes('.');
                if(k){
                        display.innerText='Error INVALID MOVE';
                        setTimeout(function(){
                            display.innerText=w;
                        },3000);
                     }
                else
                {
                    display.innerText+=value;
                }
            }

    }
}

    });




























