export const createGDPRSlice = (set) => ({
    gdprConsent: null,

    setGDPRConsent: (consent) => set({ gdprConsent: consent }),
});