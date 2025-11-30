import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack, Textarea } from "@chakra-ui/react";
import { saveBuild, getParts } from "../../services/client.js";
import { successNotification, errorNotification } from "../../services/notification.js";
import { useEffect, useState } from 'react';

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

const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Textarea className="text-input" {...field} {...props} />
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

const CreateBuildForm = ({ fetchBuilds, onClose }) => {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        getParts().then(res => {
            setParts(res.data);
        }).catch(err => {
            errorNotification(err.code, "Failed to load parts");
        });
    }, []);

    const getPartsByType = (type) => parts.filter(part => part.type === type);

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    cpuId: '',
                    motherboardId: '',
                    ramId: '',
                    storageId: '',
                    psuId: '',
                    caseId: '',
                    gpuId: '',
                    cpuCoolerId: '',
                    buildImageLink: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(100, 'Must be 100 characters or less')
                        .required('Required'),
                    description: Yup.string()
                        .max(500, 'Must be 500 characters or less'),
                    cpuId: Yup.number().required('CPU is required'),
                    motherboardId: Yup.number().required('Motherboard is required'),
                    ramId: Yup.number().required('RAM is required'),
                    storageId: Yup.number().required('Storage is required'),
                    psuId: Yup.number().required('PSU is required'),
                    buildImageLink: Yup.string().url('Must be a valid URL')
                })}
                onSubmit={(build, { setSubmitting }) => {
                    setSubmitting(true);
                    saveBuild(build)
                        .then(res => {
                            successNotification(
                                "Build saved",
                                `${build.name} was successfully saved`
                            );
                            fetchBuilds();
                            onClose();
                        }).catch(err => {
                            errorNotification(
                                err.code,
                                err.response.data.message
                            );
                        }).finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({ isValid, isSubmitting, dirty }) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            <MyTextInput
                                label="Build Name"
                                name="name"
                                type="text"
                                placeholder="e.g. Gaming Beast 2024"
                            />

                            <MyTextArea
                                label="Description"
                                name="description"
                                placeholder="Describe your build..."
                            />

                            <MySelect label="CPU *" name="cpuId">
                                <option value="">Select CPU</option>
                                {getPartsByType('CPU').map(part => (
                                    <option key={part.id} value={part.id}>
                                        {part.name} - ${part.price}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="Motherboard *" name="motherboardId">
                                <option value="">Select Motherboard</option>
                                {getPartsByType('MOTHERBOARD').map(part => (
                                    <option key={part.id} value={part.id}>
                                        {part.name} - ${part.price}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="RAM *" name="ramId">
                                <option value="">Select RAM</option>
                                {getPartsByType('RAM').map(part => (
                                    <option key={part.id} value={part.id}>
                                        {part.name} - ${part.price}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="Storage *" name="storageId">
                                <option value="">Select Storage</option>
                                {getPartsByType('STORAGE').map(part => (
                                    <option key={part.id} value={part.id}>
                                        {part.name} - ${part.price}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="PSU *" name="psuId">
                                <option value="">Select PSU</option>
                                {getPartsByType('PSU').map(part => (
                                    <option key={part.id} value={part.id}>
                                        {part.name} - ${part.price}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="GPU (Optional)" name="gpuId">
                                <option value="">Select GPU</option>
                                {getPartsByType('GPU').map(part => (
                                    <option key={part.id} value={part.id}>
                                        {part.name} - ${part.price}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="Case (Optional)" name="caseId">
                                <option value="">Select Case</option>
                                {getPartsByType('CASE').map(part => (
                                    <option key={part.id} value={part.id}>
                                        {part.name} - ${part.price}
                                    </option>
                                ))}
                            </MySelect>

                            <MySelect label="CPU Cooler (Optional)" name="cpuCoolerId">
                                <option value="">Select CPU Cooler</option>
                                {getPartsByType('CPU_COOLER').map(part => (
                                    <option key={part.id} value={part.id}>
                                        {part.name} - ${part.price}
                                    </option>
                                ))}
                            </MySelect>

                            <MyTextInput
                                label="Build Image URL"
                                name="buildImageLink"
                                type="text"
                                placeholder="https://example.com/build-image.jpg"
                            />

                            <Button 
                                disabled={!(isValid && dirty) || isSubmitting} 
                                type="submit"
                                colorScheme="blue"
                            >
                                {isSubmitting ? 'Creating...' : 'Create Build'}
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateBuildForm;