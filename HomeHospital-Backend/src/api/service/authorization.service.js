import jwt from 'jsonwebtoken'



/**
 * @function
 * @summary authorization check for admin-only pages
 * @description Check applied to pages that only an administrator has authorization to access. It is called after the user is 
 * already authenticated as a valid user, and simply checks the type of user before allowing them to proceed, or turning them away. 
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 * @returns error message if no access token is present
 */
export const checkMayAccessAdminPage = async (req, res, next) => {
    let codedAccessToken = req.cookies['accessTokenCookie']
    if(!codedAccessToken) {
        console.log("No access token present");
        res.status(401).send({ message: 'Authorization Failed' })
        return
    }
    const accessToken = jwt.decode(codedAccessToken);
    const adminId = accessToken.adminId
    if(adminId) {
        console.log("User is an admin, they may proceed");
        next()
    } else {
        console.log("User is not an admin, they may not proceed");
        res.status(401).json({ message: 'Authorization Failed' })
    }
}

/**
 * @function
 * @summary authorization check for practitioner-only pages
 * @description Check applied to pages that only a practitioner has authorization to access. It is called after the user is 
 * already authenticated as a valid user, and simply checks the type of user before allowing them to proceed, or turning them away. 
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 * @returns error message if no access token is present
 */
export const checkMayAccessPractitionerPage = async (req, res, next) => {
    let codedAccessToken = req.cookies['accessTokenCookie']
    if(!codedAccessToken) {
        console.log("No access token present");
        res.status(401).send({ message: 'Authorization Failed' })
        return;
    }
    const accessToken = jwt.decode(codedAccessToken);
    const practitionerId = accessToken.practitionerId
    if(practitionerId) {
        console.log("User is a practitioner, they may proceed");
        next()
    } else {
        console.log("User is not a practitioner, they may not proceed");
        res.status(401).send({ message: 'Authorization Failed' })
    }
}
