const client = require("../configs/database");

exports.updatenotificationlocation = async (req, res) => {
    const { id, latitude, longitude } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE id= $1;`, [id]) //Verifying if the user exists in the database
        const user = data.rows;
        if (user.length === 0) {
            res.status(500).json({
                error: "User does not exist!",
            });
        }
        else {
            await client.query(`UPDATE notifications SET latitude=$1, longitude=$2 WHERE id=$3;`, [latitude, longitude, id]);

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
