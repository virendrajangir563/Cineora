import { createContext, useContext, useEffect, useState } from "react";
import { VerifyMe, LogOut } from "../../services/Authapi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                console.log("Loading started");
                setLoading(true);
                setError(null);

                const data = await VerifyMe();
                setUser(data.user);
            } catch (err) {
                setUser(null);

                if (err.response?.status !== 401) {
                    setError(
                        err.response?.data?.message ||
                        "Unable to verify user. Please try again."
                    );
                }
            } finally {
                console.log("Loading finished");
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const logout = async () => {
        try {
            await LogOut();
        } catch (err) {
            throw err;
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, setUser, loading, error, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);