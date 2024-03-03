import './App.css'
import Temperature from './components/Temperature'

function App() {
  return (
    <div className='bg-[#1f213a] h-screen flex justify-center align-top'>
    <div className="left mt-40 w-1/5 h-1/3">
      <Temperature/>
    </div>
    <div className="right bg-blue-400 mt-40 w-1/3 h-1/3">right</div>
    </div>
  )
}

export default App
