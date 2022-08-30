const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

const  error = (status, msg) => {
    let err = new Error(msg);
    err.status = status;
    return err;
};

app.all('/', (req, res, next) => {
    res.status(200).send({message: 'Hello! check /howold to calculate your age.'});
});

// Initialize Limiter
const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 3, // limit each IP to 3 requests per second
    message: "Too many requests created from this IP, please try again after one second",
});

//This endpoint receives the dob parameter and calculates the age
app.get('/howold', limiter, (req, res, next) => {
    let dob = req.query.dob;

    if (!dob) return next(error(400, 'Date of birth (dob) query parameter required'));

    if (isNaN(new Date(dob).getFullYear())) return next(error(401, 'Date of birth (dob) should be a timestamp e.g YYYY/MM/DD or YYYY-MM-DD recommended'));

    else {
        let today = new Date(),
        birthDate = new Date(dob),
        yearOfBirth = birthDate.getFullYear(),
        currentYear = today.getFullYear(),
        age = currentYear - yearOfBirth,
        m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        res.status(200).send({ age: age });
    }
});


//error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ error: err.message });
  });


//JSON 404 middleware
app.use((req, res) => {
    res.status(404).send({ error: "Sorry, this endpoint doesn't exist!" });
});

app.listen(process.env.PORT || 3000);