import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text)=>{
    try {
        const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASSWORD,
        },
        });

        const info = await transporter.sendMail({
            from: '"INNGEST TMS',
            to ,
            subject,
            text,
        });

        console.log("Message sent:", info.messageId);
        return info;
        
    } catch (error) {
        console.error("Error sending email: ", error);
        throw new Error("Failed to send email");
    }
}