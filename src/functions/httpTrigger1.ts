import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { runFuncVersion } from "../utils/runFuncVersion";

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
        const output = await runFuncVersion();
        return { body: output };
    } catch (error) {
        return { body: error.message };
    }
};

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: httpTrigger1
});
