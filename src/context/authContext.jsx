import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    // Sign up
    const signUpNewUser = async (email, password, displayName) => {

        const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email.toLowerCase())
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error("Error checking existing user: ", fetchError);
            return { success: false, error: fetchError };
        }

        if (existingUser) {
            return { success: false, error: 'Email is already in use.' };
        }

        const { data, error: authError } = await supabase.auth.signUp({
            email: email.toLowerCase(),
            password: password,
        });

        if (authError) {
            console.error("Error signing up: ", authError);
            return { success: false, authError };
        }

        const { error: dbError } = await supabase.from('users').insert([
            {
                id: data.user.id,
                name: displayName,
                email: email.toLowerCase(),
            }
        ]).single();

        if (dbError) {
            console.error("Error storing user data in users table:", dbError);
            return { success: false, error: dbError };
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
                console.error("Sign-in error:", error.message);
                return { success: false, error: error.message };
            }

            return { success: true, session: data.session };
        } catch (error) {

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