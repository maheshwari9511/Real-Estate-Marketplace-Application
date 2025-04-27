export const environment: { production: boolean, apiUrl: string, firebaseConfig: object } = {
    production: true,
    apiUrl: 'http://localhost:3000', // Update this to the live server URL if needed
    firebaseConfig: {
        apiKey: "YOUR_API_KEY", // Replace with your actual API key
        authDomain: "realestatewebsite.firebaseapp.com",
        projectId: "realestatewebsite-4c876",
        storageBucket: "realestatewebsite.appspot.com",
        messagingSenderId: "1068910869784",
        appId: "YOUR_APP_ID" // Replace with your actual App ID
    }
};
