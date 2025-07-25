import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {getCustomers, login as performLogin} from "../../services/client.js";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [customer, setCustomer] = useState(null);

    const setCustomerFromToken = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            setCustomer({
                username: token.sub,
                roles: token.scopes,
                id: token.id
            })
        }
    }
    useEffect(() => {
        setCustomerFromToken()
    }, [])


    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.headers["authorization"];
                localStorage.setItem("access_token", jwtToken);

                const decodedToken = jwtDecode(jwtToken);

                setCustomer({
                    username: decodedToken.sub,
                    roles: decodedToken.scopes,
                    id: decodedToken.id
                })
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    const logOut = () => {
        localStorage.removeItem("access_token")
        setCustomer(null)
    }

    const isCustomerAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const { exp: expiration } = jwtDecode(token);
        if (Date.now() > expiration * 1000) {
            logOut()
            return false;
        }
        return true;
    }

    const isUserAdmin = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const decodedToken = jwtDecode(token);
        return decodedToken.scopes && decodedToken.scopes.includes('ROLE_ADMIN');
    }

    return (
        <AuthContext.Provider value={{
            customer,
            login,
            logOut,
            isCustomerAuthenticated,
            setCustomerFromToken,
            isUserAdmin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;