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
import CreatePartForm from "./CreatePartForm.jsx";
import {useAuth} from "../context/AuthContext.jsx";


const AddIcon = () => "+";
const CloseIcon = () => "x";

const CreatePartDrawer = ({ fetchParts }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isUserAdmin } = useAuth();

    return <>
    {isUserAdmin() && (
        <>
            <Button
                leftIcon={<AddIcon />}
                colorScheme={"blue"}
                onClick={onOpen}
            >
                Add Part
            </Button>
            <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create new part</DrawerHeader>

                    <DrawerBody>
                        <CreatePartForm
                            fetchParts={fetchParts}
                        />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            leftIcon={<CloseIcon />}
                            colorScheme={"teal"}
                            onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )}
    </>
}

export default CreatePartDrawer;