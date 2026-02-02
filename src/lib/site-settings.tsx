"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface SiteSettings {
    schoolName: string;
    shortName: string;
    logo: string;
    email: string;
    phone: string;
    address: string;
    socials: {
        facebook: string;
        instagram: string;
        youtube: string;
    };
}

const defaultSettings: SiteSettings = {
    schoolName: "Yashoda Devi Paramount Public School",
    shortName: "YDPPS",
    logo: "/images/logo.jpg", // Placeholder path
    email: "yashodhadeviparamountpublicsch@gmail.com",
    phone: "+91 98765 43210",
    address: "Kharagpur - Asarganj Rd, Kharagpur, Singhpur, Bihar 811213",
    socials: {
        facebook: "",
        instagram: "",
        youtube: ""
    }
};

interface SiteSettingsContextType {
    settings: SiteSettings;
    loading: boolean;
    updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to real-time updates
        const settingsRef = doc(db, 'settings', 'general');

        const unsubscribe = onSnapshot(settingsRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setSettings({ ...defaultSettings, ...docSnapshot.data() } as SiteSettings);
            } else {
                // If doc doesn't exist, we could create it, or just use defaults
                // Let's stick with defaults for now, Admin page will handle creation/update
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching site settings:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateSettings = async (newSettings: Partial<SiteSettings>) => {
        try {
            const settingsRef = doc(db, 'settings', 'general');
            await setDoc(settingsRef, newSettings, { merge: true });
        } catch (error) {
            console.error("Error updating settings:", error);
            throw error;
        }
    };

    return (
        <SiteSettingsContext.Provider value={{ settings, loading, updateSettings }}>
            {children}
        </SiteSettingsContext.Provider>
    );
}

export function useSiteSettings() {
    const context = useContext(SiteSettingsContext);
    if (context === undefined) {
        throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
    }
    return context;
}
