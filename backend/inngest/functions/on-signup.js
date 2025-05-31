import { NonRetriableError } from "inngest";
import User from "../../models/user";
import { inngest } from "../client";
import { sendEmail } from "../../utils/mailer";


export const onUserSignup = inngest.createFunction(
    {id: "on-user-signup", retries: 2},
    {event: "user/signup"},
    async ({event, step})=>{
        try {
            const {email} = event.data;
            const user = await step.run("get-user-email", async ()=>{
                const userObject = await User.findOne({email})
                if(!userObject){
                    throw new NonRetriableError("User no longer exists in our database")
                }
                return userObject;
            })

            await step.run("send-welcome-email", async ()=>{
                const subject = "Welcome to APP";
                const message = `Hi,
                \n\n
                Thanks for signing up. You are too cute to be ignored🥹
                \n\n
                `
                await sendEmail(user.email, subject, message);
            })
            return {success: true}
        } catch (error) {
            console.error("❌Error running step", error.message)
            return {success: false}
        }
    }
)