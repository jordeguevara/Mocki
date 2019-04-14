
const {addNewUser} = require('./db/awsDB')
const initalizeApp = () => {
    //creates User Table if not already,
    const bob = { email: "random@gmail.com" };
    addNewUser(bob);
}

module.exports = {
    initalizeApp
}