import React, { createContext, useContext, useState, useEffect } from "react";
import avatarUser from "../assets/user/images/avatar_user.jpg";
import avatarAdmin from "../assets/admin/avatar_admin.jpg";

const AuthContext = createContext();

// Dữ liệu mẫu cho user và admin
const USERS = [
    {
        username: "user",
        password: "user123",
        role: "Con Mèo Ngáo Ngơ",
        name: "Xá Xíu",
        email: "xaxiuthempate@gmail.com",
        avatar: avatarUser,
    },
    {
        username: "admin",
        password: "admin123",
        role: "admin",
        name: "Admin ",
        email: "admin@bibi.com",
        avatar: avatarAdmin,
    },
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Lấy thông tin từ localStorage khi load lại trang
        const storedUser = localStorage.getItem("bibi_user");
        const storedToken = localStorage.getItem("bibi_token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = (username, password) => {
        const found = USERS.find(
            (u) => u.username === username && u.password === password
        );
        if (found) {
            const fakeToken = `${found.username}-token`;
            setUser(found);
            setToken(fakeToken);
            localStorage.setItem("bibi_user", JSON.stringify(found));
            localStorage.setItem("bibi_token", fakeToken);
            return { success: true, user: found };
        }
        return { success: false };
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("bibi_user");
        localStorage.removeItem("bibi_token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 