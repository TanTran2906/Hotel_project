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
import { useService } from "./useService";
import { useEffect } from "react";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmedPaid, setConfirmedPaid] = useState(false);
    const [tempTotalPrice, setTempTotalPrice] = useState(0);

    const [addBreakfast, setAddBreakfast] = useState(false);
    const [addSpa, setAddSpa] = useState(false);
    const [addFishing, setAddFishing] = useState(false);
    const [addMountainCLimbing, setAddMountainCLimbing] = useState(false);

    const { checkin, isCheckingIn, updateServices } = useChecking(); //custom hook
    const moveBack = useMoveBack(); //custom hook

    const { bookingId } = useParams();
    const { isLoading, booking = {} } = useBooking({ bookingId });
    const {
        isLoading: isLoadingServices,
        services = [],
        error: errorService,
    } = useService();

    const serviceDataArray = [
        { serviceId: 1 }, // Dịch vụ có ID 1
        { serviceId: 2 }, // Dịch vụ có ID 2
        { serviceId: 3 }, // Dịch vụ có ID 3
        { serviceId: 4 }, // Dịch vụ có ID 4
    ];

    const { id, guests, totalPrice, numGuests, hasService, numNights } =
        booking;

    //Service price
    const optionalBreakfastPrice = services[0]?.price * numNights * numGuests;
    const optionalSpaPrice = services[1]?.price * numNights * numGuests;
    const optionalFishingPrice = services[2]?.price * numNights * numGuests;
    const optionalMountainClimbingPrice =
        services[3]?.price * numNights * numGuests;

    useEffect(
        function () {
            // Tính toán giá trị tạm thời dựa trên các checkbox đã chọn
            let totalPriceAfter = totalPrice;

            if (addBreakfast) {
                totalPriceAfter += optionalBreakfastPrice;
            }

            if (addSpa) {
                totalPriceAfter += optionalSpaPrice;
            }

            if (addFishing) {
                totalPriceAfter += optionalFishingPrice;
            }

            if (addMountainCLimbing) {
                totalPriceAfter += optionalMountainClimbingPrice;
            }

            setTempTotalPrice(totalPriceAfter);
        },
        [addBreakfast, addSpa, addFishing, addMountainCLimbing]
    );

    // console.log(services[0]);

    // console.log(
    //     optionalBreakfastPrice,
    //     optionalSpaPrice,
    //     optionalFishingPrice,
    //     optionalMountainClimbingPrice
    // );

    if (isLoading || isLoadingServices) return <Spinner />;

    function handleCheckin() {
        if (!confirmedPaid) return;

        if (addBreakfast || addSpa || addFishing || addMountainCLimbing) {
            checkin({
                bookingId,
                service: {
                    hasService: true,
                    extrasPrice:
                        (addBreakfast ? optionalBreakfastPrice : 0) +
                        (addSpa ? optionalSpaPrice : 0) +
                        (addFishing ? optionalFishingPrice : 0) +
                        (addMountainCLimbing
                            ? optionalMountainClimbingPrice
                            : 0),
                    totalPrice:
                        totalPrice +
                        (addBreakfast ? optionalBreakfastPrice : 0) +
                        (addSpa ? optionalSpaPrice : 0) +
                        (addFishing ? optionalFishingPrice : 0) +
                        (addMountainCLimbing
                            ? optionalMountainClimbingPrice
                            : 0),
                },
            });
            updateServices({
                bookingId,
                serviceData: {
                    addBreakfast: addBreakfast && serviceDataArray[0],
                    addSpa: addSpa && serviceDataArray[1],
                    addFishing: addFishing && serviceDataArray[2],
                    addMountainCLimbing:
                        addMountainCLimbing && serviceDataArray[3],
                },
            });
        } else {
            checkin({ bookingId, service: {} });
        }

        // checkin(bookingId);
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{id}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasService && (
                <>
                    <Box>
                        <Checkbox
                            checked={addBreakfast}
                            onChange={() => {
                                setAddBreakfast((add) => !add);
                            }}
                            id="breakfast"
                        >
                            Want to add breakfast for{" "}
                            {!addBreakfast
                                ? formatCurrency(tempTotalPrice)
                                : `${formatCurrency(
                                      tempTotalPrice
                                  )} ( + ${formatCurrency(
                                      optionalBreakfastPrice
                                  )} )`}
                            ?
                        </Checkbox>
                    </Box>

                    <Box>
                        <Checkbox
                            checked={addSpa}
                            onChange={() => setAddSpa((add) => !add)}
                            id="spa"
                        >
                            Want to add spa for{" "}
                            {!addSpa
                                ? formatCurrency(tempTotalPrice)
                                : `${formatCurrency(
                                      tempTotalPrice
                                  )} ( + ${formatCurrency(optionalSpaPrice)} )`}
                            ?
                        </Checkbox>
                    </Box>

                    <Box>
                        <Checkbox
                            checked={addFishing}
                            onChange={() => setAddFishing((add) => !add)}
                            id="fishing"
                        >
                            Want to add fishing for{" "}
                            {!addFishing
                                ? formatCurrency(tempTotalPrice)
                                : `${formatCurrency(
                                      tempTotalPrice
                                  )} ( + ${formatCurrency(
                                      optionalFishingPrice
                                  )} )`}
                            ?
                        </Checkbox>
                    </Box>

                    <Box>
                        <Checkbox
                            checked={addMountainCLimbing}
                            onChange={() =>
                                setAddMountainCLimbing((add) => !add)
                            }
                            id="mountainClimbing"
                        >
                            Want to add mountain climbing for{" "}
                            {!addMountainCLimbing
                                ? formatCurrency(tempTotalPrice)
                                : `${formatCurrency(
                                      tempTotalPrice
                                  )} ( + ${formatCurrency(
                                      optionalMountainClimbingPrice
                                  )} )`}
                            ?
                        </Checkbox>
                    </Box>
                </>
            )}

            <Box>
                <Checkbox
                    checked={confirmedPaid}
                    disabled={confirmedPaid || isCheckingIn}
                    onChange={() => setConfirmedPaid((confirm) => !confirm)}
                    id="confirm"
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of {formatCurrency(tempTotalPrice)}
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
