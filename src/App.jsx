import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
 const[length, setLength] = useState(8)
 const[numberAllowed, setNumberAllowed] = useState(false)
 const[charAllowed, setCharAllowed] = useState(false)
 const[password, setPassword] = useState('')
 const[copySuccess, setCopySuccess] = useState('')
 const[isVisible, setIsVisible] = useState(false)
 


{/* LOGIC */}


const generatePassword = useCallback(() => {
     let password = ''
     let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

     if(numberAllowed) str += '0123456789'
     if(charAllowed)   str += '!@#$%^&*()_+-=~'


     for(let i=1; i<length; i++){
         const result = Math.floor(Math.random() * str.length + 1)
         password += str.charAt(result)
     }

     setPassword(password)

  
}, [length, numberAllowed, charAllowed])






const passRef = useRef(null)

const copyPasswordToClipboard = () => {
  window.navigator.clipboard.writeText(password)
  passRef.current.select()
  setCopySuccess('Password copied to the clipboard!')
  setIsVisible(true)
}





useEffect(() => {
  generatePassword()
}, [length, numberAllowed, charAllowed])


// Reset 

const resetButton = () => {
       setNumberAllowed(false);
       setCharAllowed(false)
       setLength(8)
       setPassword('')
       setCopySuccess('')
       setIsVisible(false)
}







  return (

    <>

    <div className='mt-20 w-10/12 h-44 max-w-mid mx-auto shadow-2xl shadow-rose-400 rounded-lg px-4 py-3 my-8 bg-slate-900'>
             
             {/* HEADING */}

          <h1 className='text-2xl bg-clip-text text-transparent bg-gradient-to-r from-slate-50 to-cyan-700  font-semibold mb-2 text-center font-mono'>Password Generator : Using React & Tailwind CSS</h1>

            {/* INPUT BOX AND THE COPY BUTTON */}

                <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passRef} />

                        <button className='outline-none bg-indigo-700 hover:bg-purple-700 active:bg-indigo-700  text-white px-7 py-0.5 shrink-0.4 font-mono' onClick={copyPasswordToClipboard}>copy password</button>
                        
                </div>

            {/* Length And it's labeling*/}
           
          <div className='flex text-sm gap-x-2'>
                
                <div className='flex items-center gap-x-1'>

                     <input type='range' min={8} max={15} value={length} className='cursor-pointer'  onChange={(e) => setLength(e.target.value)} name='' id=''/>

                     <label htmlFor='length' className='text-white font-mono'>Length: {length}</label>
                </div>

            {/* Number checkbox */}

                <div className='flex items-center gap-x-1 ml-16'>

                    <input type='checkbox' name='' id=''
                      defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} className='cursor-pointer'
                    /> 
                   <label htmlFor='number' className='text-white  font-mono' >Numbers</label>
                    
                </div>


            {/* character checkbox */}

                <div className='flex items-center gap-x-1 ml-16'>

                    <input type='checkbox' name='' id=''
                     defaultChecked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)} className='cursor-pointer'
                    /> 
                   <label htmlFor='character' className='text-white  font-mono' >Characters</label>
                    
                </div>


            {/* Reset Button */}   


             <div className='flex items-center gap-x-1 ml-16'>

                    <button className='font-mono text-white outline-none rounded-md bg-pink-700 hover:bg-fuchsia-800 active:bg-indigo-700 px-4 py-1 shrink-0.5' onClick={resetButton}>Reset</button>
                    
                </div> 

          </div>


    </div>


{/* Printing copy success msg */}
    {isVisible && <div className='bg- w-fit mx-auto shadow-2xl rounded-lg px-12 py-20 my-40 shadow-orange-400' >

<p className='font-mono text-white text-md '>{copySuccess}</p>

</div>}

  

    </>
  )
}

export default App
