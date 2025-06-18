"use client"
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";

const QueryProvider = ({ children }) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
    );
}

export default QueryProvider;