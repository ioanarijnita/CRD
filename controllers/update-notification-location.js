const client = require("../configs/database");

exports.updatenotificationlocation = async (req, res) => {
    const { latitude, longitude, notificationid } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE notificationid= $1;`, [notificationid]) //Verifying if the user exists in the database
        const user = data.rows;
        if (user.length === 0) {
            res.status(500).json({
                error: "User does not exist!",
            });
        }
        else {
            await client.query(`UPDATE notifications SET latitude=$1, longitude=$2 WHERE notificationid=$3;`, [latitude, longitude, notificationid]);

            res.status(200).json({
                message: "Notification updated!"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error!", //Database connection error
        });
    };
};
