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
import CreateCustomerForm from "../shared/CreateCustomerForm.jsx";
import {useAuth} from "../context/AuthContext.jsx";


const AddIcon = () => "+";
const CloseIcon = () => "x";

const CreateCustomerDrawer = ({ fetchCustomers }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isUserAdmin } = useAuth();
    

    return <>
        {isUserAdmin() && (
        <>
            <Button
                leftIcon={<AddIcon/>}
                colorScheme={"blue"}
                onClick={onOpen}
            >
                Create customer
            </Button>
            <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create new customer</DrawerHeader>

                    <DrawerBody>
                        <CreateCustomerForm
                            onSuccess={fetchCustomers}
                        />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            leftIcon={<CloseIcon/>}
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

export default CreateCustomerDrawer;