import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";
import { useBooking } from "../bookings/useBooking";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useChecking } from "./useChecking";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmedPaid, setConfirmedPaid] = useState(false);
    const { checkin, isCheckingIn } = useChecking(); //custom hook
    const moveBack = useMoveBack(); //custom hook

    const { bookingId } = useParams();
    const { isLoading, booking = {} } = useBooking({ bookingId });

    if (isLoading) return <Spinner />;

    const { id, guests, totalPrice, numGuests, hasService, numNights } =
        booking;

    function handleCheckin() {
        if (!confirmedPaid) return;
        checkin(bookingId);
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{id}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Box>
                <Checkbox
                    checked={confirmedPaid}
                    disabled={confirmedPaid || isCheckingIn}
                    onChange={() => setConfirmedPaid((confirm) => !confirm)}
                    id="confirm"
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of {formatCurrency(totalPrice)}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmedPaid || isCheckingIn}
                >
                    Check in booking #{id}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
