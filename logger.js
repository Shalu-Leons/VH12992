const axios= require("axios");
const LOG_API="https://4.224.186.213/evaluation-service/logs";
async function writeLog(stack,level,packageName,message){
    try{
        const response= await axios.post(LOG_API,{
            stack,
            level,
            package:packageName,
            message});
    return response.data;
}
    catch(error){
        console.log(error.message);
    }
}
module.exports=writeLog;