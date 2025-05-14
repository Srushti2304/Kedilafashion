// import './App.css'

import { ToastContainer } from "react-toastify"
import { Outlet } from "react-router"

function App() {
   return (
    <>
     <ToastContainer position="top-right"
          autoClose={2000} hideProgressBar={false}
          newestOnTop={true} closeOnClick
          rtl={false} pauseOnFocusLoss={false} draggable={false}
                      pauseOnHover={false}
                      theme="colored"/>
      <Outlet/>

      {/* <h1 style={{color:"orange" , backgroundColor :"lightblue"}}>Hello React</h1> */}
      {/* <h2>Welcome to LRA</h2> */}
      {/* <Home></Home>
      <About/> */}

      {/* <PropsDemo title="Props Demo in Fun" username="harshita" isActive={true}
      age={20}></PropsDemo>
      <hr/>
      <PropsDemo title="Props Demo" username="LRA"></PropsDemo>
      <hr/>
      <PropsDemo title="Props Demo">
        <b>div tag</b>
      </PropsDemo>
      <hr/>
      <PropsDemo title="Props Demo">
        <h1>Heading</h1>
        <p>lorem</p>
        <Home/>
      </PropsDemo> */}

      {/* <EventDemo/>
      <Home/> */}

      {/* <StateDemo/> */}
      {/* <Counter/> */}

      {/* <Addition a={2}/> */}

   
    </>
  )
}

export default App

