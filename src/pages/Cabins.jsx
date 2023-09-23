import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
            </Row>

            <Row>
                <CabinTable />
            </Row>

            <Row>
                <CreateCabinForm />
            </Row>
        </>
    );
}

export default Cabins;
