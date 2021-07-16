import React, {useState} from 'react'
import Button from '../Button/Button'
import Display from '../Display/Display'
import './Frame.css'
const Frame = props =>{
    const [displayVal, setDisplayVal] = useState('');
    //We use this to reset the display value if we've just calculated something, unless its a sign/factor
    const [isCalculated, setIsCalculated] = useState(false);
    
    const signs = ['-', '+'];
    const factors = ['/', '*'];

    const changeVal =(e) =>{
        const val = e.currentTarget.getAttribute('data-value');
        const type = e.currentTarget.getAttribute('data-type');
        let lastChar;
        try{
            lastChar = displayVal.charAt(displayVal.length-1);
        }catch(e){
            setDisplayVal('Error!');
        }

        if(val === 'clearVal'){
            setDisplayVal(''); 
            return;
        }

        if(val === 'del'){
            try{
                //If we've deleted everything or have an error, clear display val
                if(displayVal.length === 0 || displayVal === 'Error!'){
                    setDisplayVal('');
                }else{
                    setDisplayVal(displayVal.slice(0, -1));
                }
            }catch(e){
                setDisplayVal('');
            }
            return;
        }

        if(displayVal.length>=13){
            console.log('Reached the limit')
            return;
        }
        //If we've hit Calculate and the next character isn't an operator, reset the number (put whatever is incoming)
        if(isCalculated && (!signs.includes(val) && !factors.includes(val))){
            setDisplayVal(val);
            return;
        }
        //Reset isCalculated so its ready for the next calculation
        setIsCalculated(false);

        if(val === '='){
            calculate();
            return;
        }

        //If we're starting with an operator while not having a number, do nothing (unless its a minus for negative numbers)
        //If the last letter is a sign do nothing, UNLESS its a factor & the NEW letter is a minus. Allows for multiplication/divison of negative numbers
        if((type === 'sign' && val !== '-') && (displayVal === '' || (signs.includes(lastChar)) || (factors.includes(lastChar) && val !== '-'))){
            return;
        }
        if(displayVal === 'Error!'){
            //Clear before we start typing
            if(val === 'clearVal'){
                setDisplayVal(''); 
            }else{
                setDisplayVal(val); 
            }
            return;
        }
        setDisplayVal(displayVal + val);
    }
    const calculate = () =>{
        try{
            //Round down if its a decimal number so we don't overflow
            let num = eval(displayVal);
            if(Number.isInteger(num)){
                setDisplayVal(num);
            }else{
                setDisplayVal(num.toFixed(6));
            }
            setIsCalculated(true);
        }catch(e){
            setDisplayVal('Error!');
        }
    }

    return(
        <div className='frame'>
            <Display value={displayVal}/>
            <Button onClick={(e)=>changeVal(e)} specialClass='darkGray' value='clearVal' placeholder="AC"/>
            {/* Decided to put a backspace because most calculators have it */}
            <Button onClick={(e)=>changeVal(e)} specialClass='darkGray' type='sign' value='del' placeholder="Del"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='darkGray' type='sign' value='%' placeholder="%"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='orange' type='sign' value='/' placeholder="/"/>
            {/* 2nd row */}
            <Button onClick={(e)=>changeVal(e)} specialClass='lightGray' value='7' placeholder="7"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='lightGray' value='8' placeholder="8"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='lightGray' value='9' placeholder="9"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='orange' type='sign' value='*' placeholder="X"/>
            {/* 3rd row */}
            <Button onClick={(e)=>changeVal(e)} specialClass='lightGray' value='4' placeholder="4"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='lightGray' value='5' placeholder="5"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='lightGray' value='6' placeholder="6"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='orange' type='sign' value='-' placeholder="-"/>
            {/* 4th row */}
            <Button onClick={(e)=>changeVal(e)} specialClass='lightGray' value='1' placeholder="1"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='lightGray' value='2' placeholder="2"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='lightGray' value='3' placeholder="3"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='orange' type='sign' value='+' placeholder="+"/>
            {/* 5th row */}
            <Button onClick={(e)=>changeVal(e)} specialClass='lightGray zero' value='0' placeholder="0"/>
            <Button onClick={(e)=>changeVal(e)} specialClass='lightGray' value='.' placeholder=","/>
            <Button onClick={(e)=>changeVal(e)} specialClass='orange' type='sign' value='=' placeholder="="/>
        </div>
    );
}

export default Frame;