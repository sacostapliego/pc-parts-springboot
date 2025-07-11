import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import { savePart } from "../../services/client.js";
import { successNotification, errorNotification } from "../../services/notification.js";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const CreatePartForm = ({ fetchParts }) => {
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    type: '',
                    brand: '',
                    price: 0
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    type: Yup.string()
                        .oneOf(
                            ['CPU', 'GPU', 'MOTHERBOARD', 'RAM', 'STORAGE', 'PSU', 'CASE'],
                            'Invalid Part Type'
                        )
                        .required('Required'),
                    brand: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    price: Yup.number()
                        .min(0, 'Must be a positive number')
                        .required('Required'),
                })}
                onSubmit={(part, { setSubmitting }) => {
                    setSubmitting(true);
                    savePart(part)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "Part saved",
                                `${part.name} was successfully saved`
                            )
                            fetchParts();
                        }).catch(err => {
                            console.log(err);
                            errorNotification(
                                err.code,
                                err.response.data.message
                            )
                        }).finally(() => {
                            setSubmitting(false);
                        })
                }}
            >
                {({ isValid, isSubmitting }) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            <MyTextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="e.g. Ryzen 7 5800X"
                            />

                            <MySelect label="Part Type" name="type">
                                <option value="">Select a part type</option>
                                <option value="CPU">CPU</option>
                                <option value="GPU">GPU</option>
                                <option value="MOTHERBOARD">Motherboard</option>
                                <option value="RAM">RAM</option>
                                <option value="STORAGE">Storage</option>
                                <option value="PSU">PSU</option>
                                <option value="CASE">Case</option>
                            </MySelect>

                            <MyTextInput
                                label="Brand"
                                name="brand"
                                type="text"
                                placeholder="e.g. AMD"
                            />

                            <MyTextInput
                                label="Price"
                                name="price"
                                type="number"
                                placeholder="e.g. 250.00"
                            />

                            <Button disabled={!isValid || isSubmitting} type="submit">Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreatePartForm;