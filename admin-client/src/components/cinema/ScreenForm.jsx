import { useState } from "react";
import TextInput from "../common/TextInput";
import { Button } from "@/components/ui/button";
import SeatRowBuilder from "../common/SeatRowBuilder"
import { generateSeats } from "@/utils/generateSeats.js";

const ScreenForm = ({ onSubmit }) => {
    const [name, setName] = useState("");
    const [rows, setRows] = useState([
        { row: "A", count: 10, type: "regular" }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // const seats = generateSeats(rows);

        onSubmit({
            name,
            rows
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
                label="Screen Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <SeatRowBuilder rows={rows} setRows={setRows} />

            <Button>Add Screen</Button>
        </form>
    );
};

export default ScreenForm;
