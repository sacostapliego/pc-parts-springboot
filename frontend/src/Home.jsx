import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { Box, Heading, Wrap, WrapItem, Spinner, Text, VStack, Container } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { getBuilds } from "./services/client.js";
import BuildCard from './components/builds/BuildCard.jsx';
import Carousel from "./components/home/Carousel.jsx";
import { carouselImages } from './components/home/Data.jsx';
import { errorNotification } from "./services/notification.js";

const Home = () => {
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getBuilds().then(res => {
            setBuilds(res.data.slice(0, 6)); // Show only first 6 builds
        }).catch(err => {
            errorNotification(
                err.code,
                err.response?.data?.message || "An error occurred while fetching builds"
            );
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <SidebarWithHeader>
            <Container minW="100%" py={8}>
                <VStack spacing={12} align="stretch">
                    {/* Carousel Section */}
                    <Carousel images={carouselImages} />

                    {/* Featured Builds Section */}
                    <Box>
                        <Heading size="lg" mb={6} textAlign="center">
                            Recent Builds
                        </Heading>
                        
                        {loading ? (
                            <Box display="flex" justifyContent="center" py={10}>
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl'
                                />
                            </Box>
                        ) : builds.length > 0 ? (
                            <Wrap justify="center" spacing="30px">
                                {builds.map((build, index) => (
                                    <WrapItem key={index}>
                                        <Box pointerEvents="none">
                                            <BuildCard
                                                {...build}
                                                fetchBuilds={() => {}}
                                            />
                                        </Box>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        ) : (
                            <Text textAlign="center" color="gray.500">
                                No builds available at the moment
                            </Text>
                        )}
                    </Box>
                </VStack>
            </Container>
        </SidebarWithHeader>
    );
};

export default Home;