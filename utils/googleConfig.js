import {google} from "googleapis";


const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET_ID=process.env.GOOGLE_CLIENT_ID;



export  const oauth2client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET_ID ,
    'postmessage'
)