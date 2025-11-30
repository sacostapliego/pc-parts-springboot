import {
    Wrap,
    WrapItem,
    Spinner,
    Text
} from '@chakra-ui/react';
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { useEffect, useState } from 'react';
import { getBuilds } from "./services/client.js";
import BuildCard from './components/builds/BuildCard.jsx';
import CreateBuildDrawer from './components/builds/CreateBuildDrawer.jsx';
import { errorNotification } from "./services/notification.js";

const Builds = () => {
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");

    const fetchBuilds = () => {
        setLoading(true);
        getBuilds().then(res => {
            setBuilds(res.data);
        }).catch(err => {
            setError(err.response?.data?.message || "An error occurred");
            errorNotification(
                err.code,
                err.response?.data?.message || "An error occurred while fetching builds"
            );
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchBuilds();
    }, []);

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
        );
    }

    if (err) {
        return (
            <SidebarWithHeader>
                <CreateBuildDrawer fetchBuilds={fetchBuilds} />
                <Text mt={5}>Ooops there was an error: {err}</Text>
            </SidebarWithHeader>
        );
    }

    if (builds.length <= 0) {
        return (
            <SidebarWithHeader>
                <CreateBuildDrawer fetchBuilds={fetchBuilds} />
                <Text mt={5}>No builds available</Text>
            </SidebarWithHeader>
        );
    }

    return (
        <SidebarWithHeader>
            <CreateBuildDrawer fetchBuilds={fetchBuilds} />
            <Wrap justify={"center"} spacing={"30px"} mt={5}>
                {builds.map((build, index) => (
                    <WrapItem key={index}>
                        <BuildCard
                            {...build}
                            fetchBuilds={fetchBuilds}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>
    );
};

export default Builds;