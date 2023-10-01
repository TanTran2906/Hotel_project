import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
export function useBookings({ filter, sortBy, page }) {
    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });
    return { isLoading, error, bookings, count }
}


