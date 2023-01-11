const client = require("../configs/database");

exports.updatebloodtype = async (req, res) => {
    const { id, bloodtype } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE id= $1;`, [id]) //Verifying if the user exists in the database
        const user = data.rows;
        if (user.length === 0) {
            res.status(500).json({
                error: "User does not exist!",
            });
        }
        else {
            let progressVar = user[0].progress;
            await client.query(`UPDATE users SET bloodtype=$1 WHERE id=$2;`, [bloodtype, id]);
            if (!user.bloodType) {
                progressVar = progressVar + 25;
            }
            res.status(200).json({
                message: "User signed in!",
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                email: user[0].email,
                bloodType: bloodtype,
                birthDate: user[0].birthDate,
                phoneNumber: user[0].phoneNumber,
                gender: user[0].gender,
                id: user[0].id,
                progress: progressVar
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        });
    };
};
