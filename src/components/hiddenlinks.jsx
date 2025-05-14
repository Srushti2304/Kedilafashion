import { Navigate } from "react-router"

export const ShowOnLogin = ({children})=>{
    if(sessionStorage.getItem("3rdfeb") != null){  return children   }
    else return null
}

export const ShowOnLogout = ({children})=>{
    if(sessionStorage.getItem("3rdfeb") == null){  return children  }
    else return null
}

export const ProtectedAdmin = ({children})=>{
    if(sessionStorage.getItem("3rdfeb") != null){  
        let {isAdmin} = JSON.parse(sessionStorage.getItem("3rdfeb"))
        if(isAdmin) {return children}
        else return <Navigate to='/' replace={true} />
      }
    else return <Navigate to='/login' replace={true} />
}

export const Protected = ({children})=>{
    if(sessionStorage.getItem("3rdfeb") != null){  
        let {isAdmin} = JSON.parse(sessionStorage.getItem("3rdfeb"))
        if(isAdmin==false) {return children}
        else   { 
            sessionStorage.removeItem("3rdfeb")
           return <Navigate to='/' replace={true} /> 
    }
      }
    else return <Navigate to='/login' replace={true} />
}