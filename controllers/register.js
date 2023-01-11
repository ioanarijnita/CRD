const bcrypt = require("bcrypt");

const client = require("../configs/database");

const jwt = require("jsonwebtoken");

//Registration Function

exports.register = async (req, res) => {
    const { id, firstname, lastname, email, phonenumber, password, birthdate, bloodtype, gender } = req.body;
    try {
        const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email]); //Checking if user already exists
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(500).json({
                error: "Email already there, No need to register again.",
            });
        }
        else {
            let progressVar = 0;
            bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    res.status(err).json({
                        error: "Server error",
                    });
                const user = {
                    id,
                    firstname,
                    lastname,
                    email,
                    phonenumber,
                    password: hash,
                    birthdate,
                    bloodtype,
                    gender
                };
                var flag = 1; //Declaring a flag

                //Inserting data into the database

                client
                    .query(`INSERT INTO users (id, firstname, lastname, email, phonenumber, password, birthdate, bloodtype, gender) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`, [user.id, user.firstname, user.lastname, user.email, user.phonenumber, user.password, user.birthdate, user.bloodtype, user.gender], (err) => {

                        if (err) {
                            flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                            console.error(err);
                            return res.status(500).json({
                                error: "Database error"
                            })
                        }
                        else {
                            if (firstname && lastname && phonenumber && birthdate) {
                                progressVar = 25;
                            }
                            if (bloodtype) {
                                progressVar = progressVar + 25;
                            }
                            client.query(`UPDATE users SET progress=$1 WHERE id=$2;`, [progressVar, id]);
                            flag = 1;
                            res.status(200).send({ message: 'User added to database, not verified' });
                        }
                    })
                if (flag) {
                    const token = jwt.sign( //Signing a jwt token
                        {
                            email: user.email
                        },
                        process.env.SECRET_KEY
                    );
                };
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
        });
    };
}
