import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    // Sign up
    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email.toLowerCase(),
            password: password,
        });

        if (error) {
            console.error("Error signing up: ", error);
            return { success: false, error };
        }

        return { success: true, data };
    };

    // Sign in
    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password: password,
            });

            if (error) {
                console.error("Sign-in error:", error.message); // Log the error for debugging
                return { success: false, error: error.message }; // Return the error
            }

            console.log("Sign-in success:", data);
            return { success: true, session: data.session }; // Return the user data
        } catch (error) {
            // Handle unexpected issues
            console.error("Unexpected error during sign-in:", error.message);
            return {
                success: false,
                error: "An unexpected error occurred. Please try again.",
            };
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    // Sign out
    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <AuthContext.Provider
            value={{ signUpNewUser, signInUser, session, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const UserAuth = () => {
    return useContext(AuthContext);
};