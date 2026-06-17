const axios = require("axios");
const writeLog = require("./logger");

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFsdWxlb25zQGdtYWlsLmNvbSIsImV4cCI6MTc4MTY3OTY0MSwiaWF0IjoxNzgxNjc4NzQxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiN2I5NThjYzYtMGQ3MC00YjNlLWFmMDAtNDQyYzc4ODQxNzAwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2hhbGluaSBsIiwic3ViIjoiZWZhZjczZjMtODg4My00MDZhLWE1NWQtNmU1NGUxMTljYjBlIn0sImVtYWlsIjoic2hhbHVsZW9uc0BnbWFpbC5jb20iLCJuYW1lIjoic2hhbGluaSBsIiwicm9sbE5vIjoidmgxMjk5MiIsImFjY2Vzc0NvZGUiOiJqdUZwaHYiLCJjbGllbnRJRCI6ImVmYWY3M2YzLTg4ODMtNDA2YS1hNTVkLTZlNTRlMTE5Y2IwZSIsImNsaWVudFNlY3JldCI6IlR2WlJBS1RBbUFhcHpUVmsifQ.Rtgr9jgN2-ScfqY044XvAHbwpPW6vcMUHHBl28fK3Cs";

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function getTopNotifications() {
  try {

    await writeLog(
      "frontend",
      "info",
      "api",
      "Fetching notifications from API"
    );

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const notifications = response.data.notifications;

    notifications.sort((a, b) => {
      const weightA = weights[a.Type] || 0;
      const weightB = weights[b.Type] || 0;

      if (weightA !== weightB) {
        return weightB - weightA;
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = notifications.slice(0, 10);

    console.log("\n===== TOP 10 PRIORITY NOTIFICATIONS =====\n");

    top10.forEach((item, index) => {
      console.log(
        `${index + 1}. [${item.Type}] ${item.Message} | ${item.Timestamp}`
      );
    });

    await writeLog(
      "frontend",
      "info",
      "api",
      "Top 10 notifications calculated successfully"
    );

  } catch (error) {

    await writeLog(
      "frontend",
      "error",
      "api",
      `Notification API failed: ${error.message}`
    );

    console.log(
      "Error:",
      error.response?.data || error.message
    );
  }
}

getTopNotifications();