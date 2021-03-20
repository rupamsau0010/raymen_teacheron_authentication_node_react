// Import depandencies

// Import local dependencies
const Generalusers = require('../models/GeneralUsers')

// Handel Errors...
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { userName: "" ,email: "", password: ""};

    // Incorrect Email while login...
    if (err.message === "Incorrect Email") {
        errors.email = "That email is not Registrated. Consider Signup.";
        return errors;
    }

    // Incorrect Password while login...
    if (err.message === "Incorrect Password") {
        errors.password = "That Password is incorrect. Try Again.";
        return errors;
    }

    // duplicate error handel...
    if(err.code === 11000) {
        if(err.keyPattern.userName === 1) {
            errors.userName = "This UserName has been taken. Try another one.";
            return errors;
        } else {
            errors.email = "This email is already registrated";
            return errors;
        }
    }

    // Validation Errors...
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// Signup post route controller function
module.exports.signup_post = async(req, res) => {
    // Get data from req.body
    const { userName, email, password, userType } = req.body
    console.log(userType);
    
    try {
        const generalUser = await Generalusers.create({ userName, email, password, userType }); // Creating new user...
        console.log("User Created successfully...");
        res.status(201).json({ status: "success", userId: generalUser._id }); 
    } catch(err) {
        console.log(err);
        const errors = handleErrors(err);  // If any conditional error occures by the user, then handel it...
        res.status(400).send(errors);  
    }   
}

