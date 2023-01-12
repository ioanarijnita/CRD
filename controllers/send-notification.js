
const e = require("express");
const client = require("../configs/database");


//Login Function
exports.sendnotification = async (req, res) => {
    const { latitude, longitude, firstname, lastname, email, phonenumber, birthdate, bloodtype, gender } = req.body;
    try {
        client
            .query(`INSERT INTO notifications (firstname, lastname, email, phonenumber, birthdate, bloodtype, gender, latitude, longitude) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`,
                [firstname, lastname, email, phonenumber, birthdate, bloodtype, gender, latitude, longitude], (err) => {
                    if (err) {
                        res.status(500).json({
                            message: "Error sending the notification!"
                        })
                    } else {
                        res.status(200).json({
                            message: "Notification send to authorities!",
                            notificationid: user[0].notificationid
                        });
                    }
                })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in! " + err.message, //Database connection error
        });
    };
};
