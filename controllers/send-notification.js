const client = require("../configs/database");


//Login Function
exports.sendnotification = async (req, res) => {
    const { id, latitude, longitude, firstname, lastname, email, phonenumber, birthdate, bloodtype, gender, notificationid } = req.body;
    
    const data = await client.query(`SELECT * FROM users WHERE id= $1;`, [id]) //Verifying if the user exists in the database
    console.log(data.rows)
    try {
        console.log("all: ",latitude, longitude, firstname, lastname, email, phonenumber, birthdate, bloodtype, gender, notificationid)
        client.query(`INSERT INTO notifications (firstname, lastname, email, phonenumber, birthdate, bloodtype, gender, latitude, longitude, notificationid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`,
                [firstname, lastname, email, phonenumber, birthdate, bloodtype, gender, latitude, longitude, notificationid], (err) => {
                    if (err) {
                        res.status(500).json({
                            message: "Error sending the notification!, error: " + err
                        })
                    } else {
                        console.log("notif: ",notificationid)
                        res.status(200).json({
                            message: "Notification send to authorities!",
                            notificationid: notificationid
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
