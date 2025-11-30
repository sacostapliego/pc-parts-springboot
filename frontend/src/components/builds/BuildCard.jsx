import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Center,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
    Badge,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { deleteBuild } from "../../services/client.js";
import { errorNotification, successNotification } from "../../services/notification.js";
import UpdateBuildDrawer from './UpdateBuildDrawer.jsx';
import ViewBuildDrawer from './ViewBuildDrawer.jsx';
import { useAuth } from "../context/AuthContext.jsx";

export default function BuildCard({ id, name, description, cpu, motherboard, ram, storage, psu, pcCase, gpu, cpuCooler, accessories, buildImageLink, fetchBuilds }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const { isUserAdmin } = useAuth();

    // Calculate total price
    const calculateTotalPrice = () => {
        let total = 0;
        if (cpu) total += parseFloat(cpu.price);
        if (motherboard) total += parseFloat(motherboard.price);
        if (ram) total += parseFloat(ram.price);
        if (storage) total += parseFloat(storage.price);
        if (psu) total += parseFloat(psu.price);
        if (pcCase) total += parseFloat(pcCase.price);
        if (gpu) total += parseFloat(gpu.price);
        if (cpuCooler) total += parseFloat(cpuCooler.price);
        if (accessories) {
            accessories.forEach(accessory => {
                total += parseFloat(accessory.price);
            });
        }
        return total.toFixed(2);
    };

    return (
        <Center py={6}>
            <Box
                maxW={'300px'}
                minW={'300px'}
                w={'full'}
                m={2}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'lg'}
                rounded={'md'}
                overflow={'hidden'}
                _hover={{
                    transform: 'scale(1.005)',
                    boxShadow: '1xl'
                }}>
                
                <Image
                    maxH={'300px'}
                    w={'full'}
                    src={buildImageLink || 'https://content.ibuypower.com/Images/Components/27658/CS-IBP-SCALE-B-400.png'}
                    objectFit={'cover'}
                    alt={`${name} image`}
                />

                <Box p={6}>
                    <Stack spacing={2} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.500'} noOfLines={2} textAlign={'center'}>
                            {description}
                        </Text>
                        <Box fontSize='lg'>
                            ${calculateTotalPrice()}
                        </Box>
                    </Stack>

                    <Stack direction={'row'} justify={'center'} spacing={3}>
                        <ViewBuildDrawer
                            build={{ id, name, description, cpu, motherboard, ram, storage, psu, pcCase, gpu, cpuCooler, accessories, buildImageLink }}
                            totalPrice={calculateTotalPrice()}
                        />
                        {isUserAdmin() && (
                            <>
                                <UpdateBuildDrawer
                                    initialValues={{ name, description, cpuId: cpu.id, motherboardId: motherboard.id, ramId: ram.id, storageId: storage.id, psuId: psu.id, caseId: pcCase?.id, gpuId: gpu?.id, cpuCoolerId: cpuCooler?.id, accessoryIds: accessories?.map(a => a.id), buildImageLink }}
                                    buildId={id}
                                    fetchBuilds={fetchBuilds}
                                />
                                <Button
                                    bg={'red.400'}
                                    color={'white'}
                                    rounded={'full'}
                                    size={'sm'}
                                    _hover={{
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'lg'
                                    }}
                                    onClick={onOpen}
                                >
                                    Delete
                                </Button>
                                <AlertDialog
                                    isOpen={isOpen}
                                    leastDestructiveRef={cancelRef}
                                    onClose={onClose}
                                >
                                    <AlertDialogOverlay>
                                        <AlertDialogContent>
                                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                                Delete Build
                                            </AlertDialogHeader>
                                            <AlertDialogBody>
                                                Are you sure you want to delete {name}? You can't undo this action afterwards.
                                            </AlertDialogBody>
                                            <AlertDialogFooter>
                                                <Button ref={cancelRef} onClick={onClose}>
                                                    Cancel
                                                </Button>
                                                <Button colorScheme='red' onClick={() => {
                                                    deleteBuild(id).then(res => {
                                                        successNotification(
                                                            'Build deleted',
                                                            `${name} was successfully deleted`
                                                        );
                                                        fetchBuilds();
                                                    }).catch(err => {
                                                        errorNotification(
                                                            err.code,
                                                            err.response.data.message
                                                        );
                                                    }).finally(() => {
                                                        onClose();
                                                    });
                                                }} ml={3}>
                                                    Delete
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialogOverlay>
                                </AlertDialog>
                            </>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Center>
    );
}