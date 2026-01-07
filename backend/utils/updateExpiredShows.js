import Show from "../models/Show.js"

export const updateExpiredShows = async () => {
    const now = new Date()

    await Show.updateMany(
        {
            showTime: { $lt: now },
            status: "ACTIVE"
        }, {
        $set: {
            status: "COMPLETED",
            completedAt: now
        }
    }
    )

}