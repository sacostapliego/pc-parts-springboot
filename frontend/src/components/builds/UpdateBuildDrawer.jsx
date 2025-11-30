import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import UpdateBuildForm from "./UpdateBuildForm.jsx";

const UpdateBuildDrawer = ({ fetchBuilds, initialValues, buildId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return <>
        <Button
            bg={'gray.200'}
            color={'black'}
            rounded={'full'}
            size={'sm'}
            _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
            }}
            onClick={onOpen}
        >
            Update
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Update build</DrawerHeader>

                <DrawerBody>
                    <UpdateBuildForm
                        fetchBuilds={fetchBuilds}
                        initialValues={initialValues}
                        buildId={buildId}
                        onClose={onClose}
                    />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>;
};

export default UpdateBuildDrawer;