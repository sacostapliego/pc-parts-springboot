import {
    Wrap,
    WrapItem,
    Spinner,
    Text,
    Select,
    Flex,
    Box
} from '@chakra-ui/react';
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { useEffect, useState } from 'react';
import { getParts } from "./services/client.js";
import PartsWithImage from './components/parts/PartsCard.jsx';
import CreatePartDrawer from './components/parts/CreatePartDrawer.jsx';
import {errorNotification} from "./services/notification.js";

const Parts = () => {

    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");
    const [filterType, setFilterType] = useState("");

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
                <Flex justifyContent={"space-between"} alignItems={"center"} mb={5}>
                    <CreatePartDrawer
                        fetchParts={() => fetchParts(filterType)}
                    />
                    <Box w={"200px"}>
                        <Select
                            placeholder="All types"
                            onChange={(e) => setFilterType(e.target.value)}
                            value={filterType}
                        >
                            <option value="CPU">CPU</option>
                            <option value="GPU">GPU</option>
                            <option value="MOTHERBOARD">Motherboard</option>
                            <option value="RAM">RAM</option>
                            <option value="STORAGE">Storage</option>
                            <option value="PSU">PSU</option>
                            <option value="CASE">Case</option>
                        </Select>
                    </Box>
                </Flex>
                <Text mt={5}>No parts available</Text>
            </SidebarWithHeader>
        )
    }
    return (
        <SidebarWithHeader>
             <Flex justifyContent={"space-between"} alignItems={"center"} mb={5}>
                <CreatePartDrawer
                    fetchParts={() => fetchParts(filterType)}
                />
                <Box w={"200px"}>
                    <Select
                        placeholder="All types"
                        onChange={(e) => setFilterType(e.target.value)}
                        value={filterType}
                    >
                        <option value="CPU">CPU</option>
                        <option value="GPU">GPU</option>
                        <option value="MOTHERBOARD">Motherboard</option>
                        <option value="RAM">RAM</option>
                        <option value="STORAGE">Storage</option>
                        <option value="PSU">PSU</option>
                        <option value="CASE">Case</option>
                    </Select>
                </Box>
            </Flex>
            <Wrap justify={"center"} spacing={"30px"}>
                {parts.map((part, index) => (
                    <WrapItem key={index}>
                        <PartsWithImage
                            {...part}
                            fetchParts={fetchParts}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>
    )
}

export default Parts;