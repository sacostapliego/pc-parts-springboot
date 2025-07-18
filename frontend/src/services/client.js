import axios from 'axios';

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getCustomers = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
        )
    } catch (e) {
        throw e;
    }
}

export const getCustomersWithAuth = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const saveCustomer = async (customer) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
            customer
        )
    } catch (e) {
        throw e;
    }
}

export const updateCustomer = async (id, update) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
            update,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteCustomer = async (id) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getParts = async (type = '') => {
    try {
        const params = type ? { type } : {};
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/parts`,
            { params }
        )
    } catch (e) {
        throw e;
    }
}

export const savePart = async (part) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/parts`,
            part,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const updatePart = async (id, update) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/parts/${id}`,
            update,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deletePart = async (id) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/parts/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const login = async (usernameAndPassword) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
            usernameAndPassword
        )
    } catch (e) {
        throw e;
    }
}

export const uploadCustomerProfilePicture = async (id, formData) => {
    try {
        return axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}/profile-image`,
            formData,
            {
                ...getAuthConfig(),
                'Content-Type' : 'multipart/form-data'
            }
        );
    } catch (e) {
        throw e;
    }
}

export const customerProfilePictureUrl = (id) =>
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}/profile-image`;
