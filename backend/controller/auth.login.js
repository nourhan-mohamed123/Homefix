import { generateToken } from '../utils/generateToken.js'
import bcrypt from 'bcrypt';
import { models } from "../db/db.js"
import { QueryTypes } from 'sequelize';
import { sequelize } from '../db/db.js';


export const signup = async (req, res) => {
    //cities should be array ['cairo'] or ['cairo', 'alex']
    try {

        const { firstname, lastname, email, password, cityOrCities, account_type, address } = req.body;


        //for frontend to help with missing fields
        const requiredFields = { firstname, lastname, email, password, cityOrCities, account_type };
        const missingFields = Object.entries(requiredFields)
            .filter(([_, value]) => value === undefined)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return res.status(400).json({
                msg: `Missing required fields: ${missingFields.join(', ')}`,
            });
        }

        //check if acctype is anything but customer/provider
        if (account_type !== "customer" && account_type !== "provider") {
            return res.status(400).json({
                msg: `customer type should be either customer or provider:`,
            });
        }

        //test email and password
        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email not valid' });
        }

        // cities check
        // first get cities from db
        const citiesFromDb = (await models.cities.findAll()).map(city => city.name.toLowerCase())
        const isValidCity = cityOrCities.every(c => citiesFromDb.includes(c.toLowerCase()))
        if (!isValidCity) {
            return res.status(400).json({
                msg: `city is wrong`,
            });
        }


        // Normalize email and Check Existence
        const normalizedEmail = email.toLowerCase();

        const existingUser = await models.users.findOne({
            where: {
                email: normalizedEmail
            }
        })
        if (existingUser) return res.status(400).json({ msg: "Email already exists" });

        //hash
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Execute Procedure
        await sequelize.query(
            `CALL user_signup(:first, :last, :email, :pass, :type, :addr, :cities)`,
            {
                replacements: {
                    first: firstname,
                    last: lastname,
                    email: email,
                    pass: hashedPassword, // Make sure this is hashed!
                    type: account_type,
                    addr: address || null,
                    cities: JSON.stringify(cityOrCities)
                },
                type: sequelize.QueryTypes.RAW
            }
        );
        // respnse
        const newUser = await models.users.findOne({
            where: { email: normalizedEmail }
        });

        if (newUser) {
            await generateToken(newUser.user_id, newUser.email, newUser.account_type, res);
            const fullName = [newUser.first_name, newUser.last_name].filter(Boolean).join(' ') || newUser.email;

            return res.status(201).json({
                id: newUser.user_id,
                name: fullName,
                email: newUser.email,
                role: newUser.account_type,
            });
        } else {
            return res.status(400).json({ msg: "User creation failed in database" });
        }

    } catch (e) {
        console.error("Signup Error:", e.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};


export async function login(req, res) {
    const { email, password } = req.body;

    // 1. Initial Validation
    if (!email || !password) {
        return res.status(400).json({
            msg: "Missing credentials",
            fields: { email: !email, password: !password }
        });
    }

    //validate name and passewrod
    if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email not valid' });
    }


    try {
        const normalizedEmail = email.toLowerCase();
        const result = await sequelize.query(
            `CALL user_login(:email)`,
            {
                replacements: {
                    email: normalizedEmail,
                },
                type: sequelize.QueryTypes.RAW
            }
        );
        const user = result[0] || null

        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        if (! await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // 4. Generate JWT/Session
        await generateToken(user.user_id, user.email, user.account_type, res);

        // 5. Success Response
        res.json({
            id: user.user_id,
            name: user.full_name,
            email: user.email,
            role: user.account_type
        });

    } catch (e) {
        console.error("Login Error:", e);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export async function logout(_req, res) {
    try {
        res.cookie("jwt", "", { maxAge: "" });
        return res.status(200).json({ msg: "Logged out successfully" });
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}
