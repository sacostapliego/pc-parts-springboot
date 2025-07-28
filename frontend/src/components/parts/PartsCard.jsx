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
    Flex,
    Heading,
    Image,
    Stack,
    Tag,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { deletePart } from "../../services/client.js";
import { errorNotification, successNotification } from "../../services/notification.js";
import UpdatePartDrawer from './UpdatePartDrawer.jsx';
import {useAuth} from "../context/AuthContext.jsx";


export default function PartsWithImage({ id, name, type, brand, price, partImageLink, fetchParts }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const { isUserAdmin } = useAuth();


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
                    src={partImageLink}
                    objectFit={'cover'}
                    alt={`${name} image`}
                />


                <Box p={6}>
                    <Stack spacing={2} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.500'}>{brand}</Text>
                        <Text color={'gray.500'}>${price} | {type}</Text>
                    </Stack>
                </Box>
                {isUserAdmin() && (
                    <Stack direction={'row'} justify={'center'} spacing={6} p={4}>
                        <Stack>
                            <UpdatePartDrawer
                                initialValues={{ name, type, brand, price, partImageLink}}
                                partId={id}
                                fetchParts={fetchParts}
                            />
                        </Stack>
                        <Stack>
                            <Button
                                bg={'red.400'}
                                color={'white'}
                                rounded={'full'}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg'
                                }}
                                _focus={{
                                    bg: 'green.500'
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
                                            Delete Part
                                        </AlertDialogHeader>
                                        <AlertDialogBody>
                                            Are you sure you want to delete {name}? You can't undo this action afterwards.
                                        </AlertDialogBody>
                                        <AlertDialogFooter>
                                            <Button ref={cancelRef} onClick={onClose}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme='red' onClick={() => {
                                                deletePart(id).then(res => {
                                                    console.log(res);
                                                    successNotification(
                                                        'Part deleted',
                                                        `${name} was successfully deleted`
                                                    );
                                                    fetchParts();
                                                }).catch(err => {
                                                    console.log(err);
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
                        </Stack>
                    </Stack>
                )}
            </Box>
        </Center>
    );
}