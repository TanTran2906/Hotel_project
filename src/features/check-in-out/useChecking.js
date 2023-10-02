import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { updateBooking, updateBookingServices } from "../../services/apiBookings"

export function useChecking() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()


    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: ({ bookingId, service }) => updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true,
            ...service
        }),

        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`)
            queryClient.invalidateQueries({ active: true })
            navigate("/")
        },

        onError: () => toast.error("There was an error while checking in")
    })

    const { mutate: updateServices, isLoading: isUpdateServices } = useMutation({
        mutationFn: ({ bookingId, serviceData }) => updateBookingServices(bookingId, {
            ...serviceData
        }),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ active: true })
        },

        onError: () => toast.error("There was an error while checking in")
    })

    return { checkin, isCheckingIn, updateServices, isUpdateServices }
}
