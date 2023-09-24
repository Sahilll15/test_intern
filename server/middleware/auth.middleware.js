

const authmiddleware = async (req, res, next) => {

    if (req.session.user) {
        console.log("User is authenticated with session ID:", req.session.user);
        next();
    } else {
        console.log("User is not authenticated.");
        res.status(401).json({ message: 'Unauthenticated' });
    }

}


module.exports = {
    authmiddleware
}