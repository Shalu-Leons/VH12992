const writeLog= require("./logger");
async function testLogger() {
    await writeLog(
        "frontend",
        "info",
        "api",
        "notification fetch started"
    );
    await writeLog(
        "frontend",
        "debug",
        "component",
        "notification card rendered"
    );
    console.log("Logs sent");
}
testLogger();