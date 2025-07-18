import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import {Center, Spinner} from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {

    const { isCustomerAuthenticated } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (!isCustomerAuthenticated()) {
            navigate("/")
        }
    }, [isCustomerAuthenticated, navigate])

    if (isCustomerAuthenticated()) {
        return children;
    }

    return (
        <Center h={"100vh"}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Center>
    );
}

export default ProtectedRoute;