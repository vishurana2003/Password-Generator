const inputslider=document.querySelector("[data-lengthslider]");
const length=document.querySelector("[data-lengthnumber]");
const copybtn=document.querySelector("[data-copy]");
const copymsg =document.querySelector("[data-copyMsg]");
const uppercasechek=document.querySelector("#uppercase");
const lowercasechek=document.querySelector("#lowercase");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const numberscheck=document.querySelector("#numbers");
const symbolchek=document.querySelector("#Symbol");
const indicator=document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".Generate-button");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const symbol='~!@#$%^*()_-{[}]|\:;"<>+=?,`';

let password="";
let passwordlength=10;
let checkcount=0;

    
handleSlider();



function handleSlider()
{
    inputslider.value=passwordlength;
    length.innerText=passwordlength;

const min=inputslider.min;
const max=inputslider.max;

inputslider.style.backgroundSize= ( (passwordlength-min)*100/(max-min)) + "% 100%";
    
   
};



function setIndicator(color)
{
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=color;
    
    
}


function getrandominteger(min, max)
{
     return Math.floor(Math.random()*(max-min)) + min;
     

}


function generaterandomnumber()
{
     return getrandominteger(0,9);
}

function generateLowerCase()
{
    return String.fromCharCode(getrandominteger(97,123));
}


function generateUpperCase()
{
    return String.fromCharCode(getrandominteger(65,91));
}


function generateSymbol()
{
   const index= generaterandomnumber(0,symbol.length);
   return symbol.charAt(index);
   
}

function calcStrength()
{
    let hasupper=false;
    let haslower=false;
    let hasnum=false;
    let hassym=false;

    if(uppercasechek.checked) hasupper=true;
    if(lowercase.checked) haslower=true;
    if(numberscheck.checked) hasnum=true;
    if(symbolchek.checked) hassym=true;

    if((hasupper && haslower) && (hasnum || hassym ) && passwordlength>=8 )
        {
            setIndicator("#0f0");
        }

        else if( (haslower||hasupper) &&
    (hasnum || hassym) && passwordlength>=6)
    {
        setIndicator("#ff0");
    }

    else
    {
        setIndicator("#f00");
    }
    
};

 async function copycontent()
{
   try{await  navigator.clipboard.writeText(passwordDisplay.value);
    copymsg.classList.add('actve');
    copymsg.innerText="copied";
   }

   catch(e)
   {
    copymsg.innerText="failed";
   }
       copymsg.classList.add("active");
   setTimeout(()=>{
    copymsg.classList.remove("active");
   },2000);
}

function shufflepassword(shufflepassword){
    // Fisher yets methods=Used to shuffle password;
    for(let i=shufflepassword.length-1;i>0;i--){
        const j=Math.floor(Math.random() *(i+1));
        const temp=shufflepassword[i];
        shufflepassword[i]=shufflepassword[j];
        shufflepassword[j]=temp;
    }

    let str="";
    shufflepassword.forEach((el)=>(str+=el));
    return str;
}

function handlecheckboxchange()
{
    checkcount=0;

    allcheckbox.forEach( (checkbox) => {
            if(checkbox.checked)
                checkcount++;
    });
    if(passwordlength<checkcount)
        {
            passwordlength=checkcount;
            handleSlider();
        }

}


allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handlecheckboxchange)
})

inputslider.addEventListener('change',(e) =>{
    passwordlength=e.target.value;
    handleSlider();
    inputslider.classList.add('color-active');
})

copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        {
            copycontent();
        }
})

generatebtn.addEventListener('click',()=>{
         if(checkcount<=0) return;
         

         if(passwordlength<checkcount)
            {
                passwordlength=checkcount;
                handleSlider();
            }

            // Remove old password

            password="";


            // if(uppercasechek.checked)
            //     {
            //         password+=generateUpperCase();
            //     }

            //     if(lowercasechek.checked)
            //         {
            //             password+=generatelowerCase();
            //         }


            //         if(numberscheck.checked)
            //             {
            //                 password+=generaterandomnumber();
            //             }

            //             if(symbolchek.checked)
            //                 {
            //                     password+=generateSymbol();
            //   

            console.log("ok");
            
        let funcarry=[];

        if(uppercasechek.checked)
            funcarry.push(generateUpperCase);

        if(lowercasechek.checked)
            funcarry.push(generateLowerCase);

        if(numberscheck.checked)
            funcarry.push(generaterandomnumber);
        console.log("true")

        if(symbolchek.checked)
            funcarry.push(generateSymbol);

                for(let i=0;i<funcarry.length;i++)
                    {
                        password+=funcarry[i]();
                    }

                    if(passwordlength<4)
                        {
                            passwordlength=4;
                            handleSlider();
                        }

                    for(let i=0;i<passwordlength-funcarry.length;i++)
                        {
                            let ranIndex=getrandominteger(0,funcarry.length);
                            password += funcarry[ranIndex]();
                        }
                        console.log("Ui addition dne")
                        password=shufflepassword(Array.from(password));

                        passwordDisplay.value=password;

                        calcStrength();
                        console.log("value");
});

