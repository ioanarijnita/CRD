
const e = require("express");
const client = require("../configs/database");

exports.getnotifications = async (req, res) => {
    const {  } = req.body;
    try {
        const data = await client.query(`SELECT * FROM notifications;`, []) //Verifying if the user exists in the database
        const notif = data.rows;
        if (notif.length === 0) {
            res.status(500).json({
                error: "Error",
            });
        }
        else {
            res.status(200).json({
                notifications: notif
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error!", //Database connection error
        });
    };
};
