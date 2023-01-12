
const e = require("express");
const client = require("../configs/database");


//Login Function
exports.sendnotification = async (req, res) => {
    const { id, latitude, longitude } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE id=$1;`, [id]) //Verifying if the user exists in the database
        const user = data.rows;
        // if (user.length === 0) {
        //     res.status(500).json({
        //         error: "User is not registered, Sign Up first",
        //     });
        // }
        // else {
            client
                .query(`INSERT INTO notifications (firstname, lastname, email, phonenumber, birthdate, bloodtype, gender, latitude, longitude) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`, 
                [user[0].firstname, user[0].lastname, user[0].email, user[0].phonenumber, user[0].birthdate, user[0].bloodtype, user[0].gender, latitude, longitude], (err) => {
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
        // }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        });
    };
};
