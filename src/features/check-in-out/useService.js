import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../services/apiServices";

export function useService() {
    const {
        isLoading,
        data: services = [],
        error,
    } = useQuery({
        queryKey: ["services"],
        queryFn: getServices,
    });

    return { isLoading, services, error }
}


