/**
 * Custom fetch wrapper that handles authentication errors
 * Automatically redirects to sign-in page on 401 Unauthorized
 */
export async function authenticatedFetch(url, options = {}) {
    try {
        const response = await fetch(url, options);
        
        // Check if unauthorized
        if (response.status === 401) {
            console.warn("401 Unauthorized - Redirecting to sign-in");
            window.location.href = "/";
            return null;
        }
        
        return response;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
