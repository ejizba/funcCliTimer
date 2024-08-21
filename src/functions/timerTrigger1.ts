import { app, InvocationContext, Timer } from "@azure/functions";
import { runFuncVersion } from "../utils/runFuncVersion";

export async function timerTrigger1(myTimer: Timer, context: InvocationContext): Promise<void> {
    context.log('Timer function processed request.');
    for (let i = 0; i < 10; i++) {
        await runFuncVersion();
        await delay(2000);
    }
}

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    handler: timerTrigger1
});

async function delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

