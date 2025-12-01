import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import CreateBuildForm from "./CreateBuildForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const AddIcon = () => "+";

const CreateBuildDrawer = ({ fetchBuilds }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isUserAdmin } = useAuth();

    return <>
        {isUserAdmin() && (
            <>
                <Button
                    leftIcon={<AddIcon />}
                    colorScheme={"blue"}
                    onClick={onOpen}
                >
                    Add Build
                </Button>
                <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Create new build</DrawerHeader>

                        <DrawerBody>
                            <CreateBuildForm
                                fetchBuilds={fetchBuilds}
                                onClose={onClose}
                            />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        )}
    </>;
};

export default CreateBuildDrawer;