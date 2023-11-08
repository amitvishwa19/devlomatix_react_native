import{createContext, useState} from 'react'

const LoginContext = createContext(null);

const LoginProvider = ({children}:any)=>{
    const [isLoggedIn, setIsLOggedIn] = useState(false)

    return <LoginContext.Provider>
        {children}
    </LoginContext.Provider>
}

export default LoginProvider;