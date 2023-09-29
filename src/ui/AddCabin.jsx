// import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
// import CabinTable from "../features/cabins/CabinTable";

function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add new cabin</Button>
            </Modal.Open>

            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>

            {/* <Modal.Open opens="table">
                <Button>Show table</Button>
            </Modal.Open>

            <Modal.Window name="table">
                <CabinTable />
            </Modal.Window> */}
        </Modal>
    );
}

export default AddCabin;
