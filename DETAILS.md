#  Design and Implementation Details

The API was built in Express.js, a web framework for Node.js.

1. The `GET /howold` endpoint accepts date of birth (dob) as query parameter, calculates and retun age of the person.

2. It uses the express-rate-limit middleware for Express to limit requests to the `GET /howold` endpoint, such that not more than 3 calls are allowed within one second.

3. It uses the JavaScript built-in Date functions to check if the dob is in a timestamp format and calculate the age of the person.

4. An error handler is defined to return an error if the date of birth (dob) query parameter is not passed or it's not in the right format.


### How it works

1. User makes a request to the `GET /howold` endpoint passing their date of birth (dob).
2. The endpoint checks if the dob query parameter is present and is in a timestamp format.
3. The age of the person is calculated and return in th API response.