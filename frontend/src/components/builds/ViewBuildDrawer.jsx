import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
    VStack,
    HStack,
    Text,
    Image,
    Divider,
    Badge,
    Box,
    Heading,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext.jsx";

const ViewBuildDrawer = ({ build, totalPrice, isOpen, onClose }) => {
    const { isUserAdmin } = useAuth();

    const displayPrice = () => {
        if (build.priceDisplayOption === 'ADMIN_ONLY' && !isUserAdmin()) {
            return null;
        }
        
        if (build.priceDisplayOption === 'CUSTOM_PRICE') {
            if (isUserAdmin()) {
                return (
                    <Box fontSize='xl'>
                        Total: <Text as="span" color="green.500">${build.customPrice}</Text>
                        {' | '}
                        <Text as="span" color="gray.500">${totalPrice}</Text>
                    </Box>
                );
            }
            return <Box fontSize='xl'>Total: ${build.customPrice}</Box>;
        }
        
        return <Box fontSize='xl'>Total: ${totalPrice}</Box>;
    };

    const PartDetail = ({ label, part }) => {
        if (!part) return null;
        return (
            <Box w="full" p={3} borderWidth="1px" borderRadius="md">
                <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" fontSize="sm" color="gray.500">{label}</Text>
                        <Text fontSize="md">{part.name}</Text>
                        <Text fontSize="sm" color="gray.600">{part.brand}</Text>
                    </VStack>
                    <Badge colorScheme="blue">${part.price}</Badge>
                </HStack>
            </Box>
        );
    };

    return (
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <VStack align="start" spacing={2}>
                        <Text>{build.name}</Text>
                        {displayPrice()}
                    </VStack>
                </DrawerHeader> 

                <DrawerBody>
                    <VStack spacing={4} align="stretch">
                        {build.buildImageLink && (
                            <Image
                                src={build.buildImageLink}
                                alt={build.name}
                                borderRadius="md"
                                maxH="300px"
                                objectFit="cover"
                            />
                        )}
                        
                        {build.description && (
                            <Box>
                                <Text fontWeight="bold" mb={2}>Description</Text>
                                <Text color="gray.600">{build.description}</Text>
                            </Box>
                        )}

                        <Divider />

                        <Heading size="md">Required Components</Heading>
                        <PartDetail label="CPU" part={build.cpu} />
                        <PartDetail label="Motherboard" part={build.motherboard} />
                        <PartDetail label="RAM" part={build.ram} />
                        <PartDetail label="Storage" part={build.storage} />
                        <PartDetail label="PSU" part={build.psu} />
                        <PartDetail label="GPU" part={build.gpu} />
                        <PartDetail label="PC Case" part={build.pcCase} />
                        <PartDetail label="CPU Cooler" part={build.cpuCooler} />

                        {build.accessories && build.accessories.length > 0 && (
                            <>
                                <Divider />
                                <Heading size="md">Accessories</Heading>
                                {build.accessories.map((accessory, index) => (
                                    <PartDetail key={index} label={`Accessory ${index + 1}`} part={accessory} />
                                ))}
                            </>
                        )}
                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                        Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ViewBuildDrawer;