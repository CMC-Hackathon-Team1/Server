class userDAO {

    cosntructor(){}


    createPersonaByUserId = async (conn, userId, personaId, nickname, introduction, profileImgUrl) => {
        const createPersonaQuery = `
            INSERT INTO Profiles (userId, personaId, profileImgUrl, statusMessage, profileName)
            VALUE (?, ?, ?, ?, ?)
        `;

        const createPersonaParams = [userId, personaId, profileImgUrl, introduction, nickname];

        const [creationResult] = await conn.query(createPersonaQuery, createPersonaParams);

        return creationResult;
    }

    checkPersona = async (conn, userId) => {
        const checkPersonaQuery = `
            SELECT COUNT(*) as count
            FROM Profiles
            WHERE userId= ?
        `;

        const [checkPersonaResult] = await conn.query(checkPersonaQuery, userId);

        return checkPersonaResult;
    }

    retrieveUserProfiles = async (conn,userId) => {
        const retrieveUserProfilesQuery = `SELECT profileId,profileImgUrl,profileName FROM Profiles
        RIGHT JOIN Users U on Profiles.userId = U.userId
        WHERE U.userId=${userId}
        LIMIT 3;`;

        const [profileRow] = await conn.query(retrieveUserProfilesQuery);

        console.log(retrieveUserProfilesQuery);
        console.log(profileRow);

        return profileRow;
    }

    getUserMyPageData = async (conn, profileId) => {
        const getUserMyPageDataQuery = `
            SELECT * FROM Profiles
            INNER JOIN Persona as P ON Profiles.personaId = P.personaId
            WHERE Profiles.profileId = ?
        `;

        const [getUserMyPageDataResult] = await conn.query(getUserMyPageDataQuery, profileId);

        console.log(getUserMyPageDataResult);

        return getUserMyPageDataResult;
    }

}


module.exports = userDAO;
