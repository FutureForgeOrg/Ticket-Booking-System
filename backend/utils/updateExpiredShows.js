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
            completedAt: now,
            expiresAt: new Date(now.getTime() + 30 * 1000)
        }
    }
    )

}