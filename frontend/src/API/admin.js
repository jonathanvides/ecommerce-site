import { API_URL } from './url.js';

const registerAdmin = async (adminData, token) => {
    try {
        const response = await fetch(`${API_URL}/admins/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(adminData),
        });

        const newAdmin = await response.json();
        console.log(newAdmin);
        return newAdmin;
    } catch (error) {
        console.error(error);
    }
};

const adminLogin = async (loginData) => {
    try {
        const response = await fetch(`${API_URL}/admins/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        const { userDetails, token } = await response.json();
        console.log(userDetails, token);
        return { userDetails, token };
    } catch (error) {
        console.error('Error logging in admin:', error);
    }
};

const fetchAllAdmins = async (token) => {
    try {
        const response = await fetch(`${API_URL}/admins`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const admins = await response.json();
        console.log(admins);
        return admins;
    } catch (error) {
        console.error(error);
    }
};

const fetchAdminById = async (adminId, token) => {
    try {
        const response = await fetch(`${API_URL}/admins/${adminId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const admin = await response.json();
        console.log(admin);
        return admin;
    } catch (error) {
        console.error('Error fetching admin by ID:', error);
    }
};

const updateAdmin = async (adminId, adminData, token) => {
    try {
        const response = await fetch(`${API_URL}/admins/${adminId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(adminData),
        });
        const updatedAdmin = await response.json();
        console.log(updatedAdmin);
        return updatedAdmin;
    } catch (error) {
        console.error('Error updating admin:', error);
    }
};

const deleteAdmin = async (adminId, token) => {
    try {
        const response = await fetch(`${API_URL}/admins/${adminId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 204) {
            console.log('Admin deleted successfully.');
        }
    } catch (error) {
        console.error('Error deleting admin:', error);
    }
};

export {
    registerAdmin,
    adminLogin,
    fetchAllAdmins,
    fetchAdminById,
    updateAdmin,
    deleteAdmin,
};