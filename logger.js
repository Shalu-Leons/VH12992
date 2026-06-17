const axios= require("axios");
const LOG_API="http://4.224.186.213/evaluation-service/logs";
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFsdWxlb25zQGdtYWlsLmNvbSIsImV4cCI6MTc4MTY3ODAxOSwiaWF0IjoxNzgxNjc3MTE5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiN2U5MGIzN2EtMWQzYi00YjJiLWE5ZWQtOTNlNjY2MDVkN2MyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2hhbGluaSBsIiwic3ViIjoiZWZhZjczZjMtODg4My00MDZhLWE1NWQtNmU1NGUxMTljYjBlIn0sImVtYWlsIjoic2hhbHVsZW9uc0BnbWFpbC5jb20iLCJuYW1lIjoic2hhbGluaSBsIiwicm9sbE5vIjoidmgxMjk5MiIsImFjY2Vzc0NvZGUiOiJqdUZwaHYiLCJjbGllbnRJRCI6ImVmYWY3M2YzLTg4ODMtNDA2YS1hNTVkLTZlNTRlMTE5Y2IwZSIsImNsaWVudFNlY3JldCI6IlR2WlJBS1RBbUFhcHpUVmsifQ.A6i5HZV2mrrqhy5IfIhUOTjtOLkNF_w1Tq5DPpuRmik";
async function writeLog(stack,level,packageName,message){
    try{
        const response= await axios.post(LOG_API,{
            stack,
            level,
            package:packageName,
            message},
        {
            headers:{
                Authorization:'Bearer{TOKEN}'
            }
        });
    return response.data;
}
    catch(error){
        console.log("Logged error:",error.response?.data || error.message);
    }
}
module.exports=writeLog;