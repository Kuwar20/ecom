import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300">
      <Navbar />
      <h1 className='text-center text-2xl text-black dark:text-white'>Hello Frontend</h1>
    </div>
  )
}

export default App