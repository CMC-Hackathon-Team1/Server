class feedDAO {

    cosntructor(){}
    
    retrieveMyFeedDate = async (conn,  year,month) => {
        const retrieveMyFeedDateQuery = `SELECT date_format(createdAt,"%Y-%m-%d") as date FROM Feeds
        WHERE date_format(createdAt,"%Y-%m")="${year}-${month}";`;
        
        const [myFeedDateInfo] = await conn.query(retrieveMyFeedDateQuery);
    

        const myFeedDate=new Set();
        for(let i=0; i<myFeedDateInfo.length;i++){
            myFeedDate.add(myFeedDateInfo[i].date);
        }

        console.log(myFeedDate);

        return myFeedDate;
    }
    

    selectFeedList = async (conn, feedListQuery) => {
        const selectFeedList = `
        SELECT Feeds.updatedAt, content, Feeds.ImgUrl
        FROM Feeds
        WHERE Feeds.ProfileId = ?
        LIMIT ?, ?;
        `
        const [feedListRow] = await conn.query(selectFeedList, feedListQuery);

        return feedListRow;
    }

    
    // with Paging
    retrieveTotalDataCount = async (conn, profileId) => {
        const selectFeedList = `
        SELECT COUNT(profileId) as totalDataCount
        FROM Feeds
        WHERE profileId = ?;
        `
        const [totalDataCountRow] = await conn.query(selectFeedList, profileId);

        return totalDataCountRow;
    }

    selectFeedInfo = async (conn, feedInfoQuery) => {
        const selectFeedList = `
        SELECT personaName, profileName, updatedAt, content
        FROM Feeds
        JOIN Profiles on Profiles.profileId = Feeds.profileId
        JOIN Persona P on Profiles.personaId = P.personaId
        WHERE Profiles.profileId = ? and Feeds.feedId = ?
        `

        const [feedInfoRow] = await conn.query(selectFeedList, feedInfoQuery);

        return feedInfoRow;
     }


    insertFeedInfo = async (conn, insertFeedInfoParams) => {
        const insertFeedInfoQuery = `
            INSERT INTO Feeds (profileId, content, status, ImgUrl)
            VALUE (?, ?, ?, ?);
        `;
        const [insertFeedResult] = await conn.query(insertFeedInfoQuery, insertFeedInfoParams);

        return insertFeedResult;
    }

    selectCategoryId = async (conn, categoryName) => {
        const getCategoryIdQuery = `
            SELECT *
            FROM Categories
            WHERE categoryName = ?;
        `;
        const [getCategoryIdRow] = await conn.query(getCategoryIdQuery, categoryName);

        return getCategoryIdRow;
    }

    insertFeedCategoryMap = async (conn, insertFeedCategoryMapParams) => {
        const insertFeedCategoryMapQuery = `
            INSERT INTO FeedCategoryMapping (feedId, categoryId)
            VALUE (?, ?);
        `;
        const [insertFeedCategoryMapResult] = await conn.query(insertFeedCategoryMapQuery, insertFeedCategoryMapParams);

        return insertFeedCategoryMapResult;
    }

    selectHashtagId = async (conn, hashtagName) => {
        const selectHashtagIdQuery = `
            SELECT hashTagId
            FROM HashTags
            WHERE hashTagName = ?;
        `;
        const [selectHashtagIdRow] = await conn.query(selectHashtagIdQuery, hashtagName);

        return selectHashtagIdRow;
    }

    insertNewHashtagInfo = async (conn, hashTagName) => {
        const insertNewHashtagInfoQuery = `
            INSERT INTO HashTags (hashTagName)
            VALUE (?);
        `;
        const [insertNewHashtagInfoResult] = await conn.query(insertNewHashtagInfoQuery, hashTagName);

        return insertNewHashtagInfoResult;
    }

    insertNewHashtagProfileInfo = async (conn, insertNewHashtagProfileInfoParams) => {
        const insertNewHashtagInfoQuery = `
            INSERT INTO ProfileHashTagMapping (profileId, hashTagId)
            VALUE (?, ?);
        `;
        const [insertNewHashtagInfoResult] = await conn.query(insertNewHashtagInfoQuery, insertNewHashtagProfileInfoParams);

        return insertNewHashtagInfoResult;
    }

    insertFeedHashtagMapInfo = async (conn, insertFeedHashtagMapInfoParams) => {
        const insertFeedHashtagMapQuery = `
            INSERT INTO FeedHashTagMapping (feedId, hashTagId)
            VALUE (?, ?)
        `;
        const [insertFeedHashtagMapResult] = await conn.query(insertFeedHashtagMapQuery, insertFeedHashtagMapInfoParams);

        return insertFeedHashtagMapResult;

    }
    

}


module.exports = feedDAO;
