import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../utils/constants";
import { getBookings } from "../../services/apiBookings";

function BookingTable() {
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();

    //FILTER
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };
    // :  { field: "totalPrice", value: 5000, method: "gte" };

    //SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };

    //PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    const { isLoading, bookings, count } = useBookings({
        filter,
        sortBy,
        page,
    });

    console.log(bookings);

    //PRE_FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);

    //Nếu chưa phải trang cuối thì tìm nạp trước 1 trang (next page)
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });
    }

    //Nếu chưa phải trang đầu thì tìm nạp trước 1 trang (previous page)
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });
    }

    // console.log(bookings);

    if (isLoading) return <Spinner />;
    if (!bookings?.length) return <Empty resourceName="bookings" />;

    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body>
                    {bookings.map((booking) => (
                        <BookingRow key={booking.id} booking={booking} />
                    ))}
                </Table.Body>

                {/* Props pattern */}
                {/* <Table.Body
                  data={bookings}
                  render={(booking) => (
                      <BookingRow key={booking.id} booking={booking} />
                  )}
              /> */}
                {count > 10 && (
                    <Table.Footer>
                        <Pagination count={count} />
                    </Table.Footer>
                )}
            </Table>
        </Menus>
    );
}

export default BookingTable;
