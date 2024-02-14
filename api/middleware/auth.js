async function check_token(token) {
    try {
        const tokenRecord = await Runners.findOne({ token });
        if (tokenRecord) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error in findOne query:", error);
        return false;
    }
}

module.exports = async function (request, response, next) {
    // Ignore some urls for auth
    console.log(request.url)
    if(["/", "/api/login", "/api/sendOtp", "/api/verifyOtp"].includes(request.url)){
        return next();
    }
    const rawtoken = request.headers.authorization;
    if(rawtoken){
        const token = rawtoken.replace("Bearer ", "");
        const checktoken = await check_token(token);
        if (!checktoken) {
            return response.status(401).json({
                message: "Unauthorized. Invalid token.",
                status: "error",
            });
        }
        //TODO set the current user id in request to be used later
    }else{
        return response.status(401).json({
            message: "Unauthorized. Invalid token.",
            status: "error",
        });
    }
    return next();
};
