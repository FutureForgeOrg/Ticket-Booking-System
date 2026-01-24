import { useState } from "react";
import TextInput from "../common/TextInput";
import SeatRowBuilder from "../common/SeatRowBuilder";
import { generateSeats } from "@/utils/generateSeats";
import { Button } from "../ui/button";
function CinemaForm({ onSubmit, loading }) {
    const [form, setForm] = useState({
        name: "",
        locationName: "",
        city: "",
        state: "",
        screenName: "",
        rows: [
            { row: "A", count: 10, type: "regular" }
        ],
        seatType: "regular"
    });

    const setRows = (rows) => {
        setForm(prev => ({
            ...prev,
            rows
        }));
    };

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        // const seats = generateSeats(form.rows);

        onSubmit({
            name: form.name,
            location: {
                name: form.locationName,
                city: form.city,
                state: form.state
            },
            screens: [{ name: form.screenName,  rows: form.rows }]
        });
    };


    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                {/* Cinema Info */}
                <TextInput label="Cinema Name" name="name" value={form.name} onChange={handleChange} />
                <TextInput label="Location Name" name="locationName" value={form.locationName} onChange={handleChange} />
                <TextInput label="City" name="city" value={form.city} onChange={handleChange} />
                <TextInput label="State" name="state" value={form.state} onChange={handleChange} />
                <TextInput label="Screen Name" name="screenName" value={form.screenName} onChange={handleChange} />
                {/* Screen Info */}
                <SeatRowBuilder rows={form.rows} setRows={setRows} />

                {/* Submit Button */}
                <Button disabled={loading}>
                    {loading ? "Creating..." : "Create Cinema"}
                </Button>
            </form>
        </>
    )
}

export default CinemaForm