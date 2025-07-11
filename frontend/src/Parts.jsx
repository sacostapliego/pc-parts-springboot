import {
    Wrap,
    WrapItem,
    Spinner,
    Text
} from '@chakra-ui/react';
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { useEffect, useState } from 'react';
import { getParts } from "./services/client.js";
import CardWithImage from "./components/customer/CustomerCard.jsx";
import CreatePartDrawer from './components/parts/CreatePartDrawer.jsx';
import {errorNotification} from "./services/notification.js";

const Parts = () => {

    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");

    const fetchParts = () => {
        setLoading(true);
        getParts().then(res => {
            setParts(res.data)
        }).catch(err => {
            setError(err.response.data.message)
            errorNotification(
                err.code,
                err.response.data.message
            )
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchParts();
    }, [])

    if (loading) {
        return (
            <SidebarWithHeader>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        )
    }

    if (err) {
        return (
            <SidebarWithHeader>
                <CreatePartDrawer
                    fetchParts={fetchParts}
                />
                <Text mt={5}>Ooops there was an error: {err}</Text>
            </SidebarWithHeader>
        )
    }

    if(parts.length <= 0) {
        return (
            <SidebarWithHeader>
                <CreatePartDrawer
                    fetchParts={fetchParts}
                />
                <Text mt={5}>No parts available</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
             <CreatePartDrawer
                fetchParts={fetchParts}
            />
            <Wrap justify={"center"} spacing={"30px"}>
                {parts.map((part, index) => (
                    <WrapItem key={index}>
                        <CardWithImage
                            {...part}
                            // Remapping part data to customer card props
                            email={part.brand}
                            age={part.price}
                            gender={part.type}
                            imageNumber={index} // You might want a dedicated image for parts
                            fetchCustomers={fetchParts}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>
    )
}

export default Parts;