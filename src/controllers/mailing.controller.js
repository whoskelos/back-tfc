import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export const sendEmail = async (req, res) => {
    const shoppingCart = req.body;
    try {
        const emailPromises = shoppingCart.map(async (item) => {
            const { name, id_game, userEmail } = item;

            const emailResult = await resend.emails.send({
                from: "GameKeyZone <gamekeyzone@kelvinguerrero.dev>",
                to: [`${userEmail}`],
                subject: "Información de tu compra",
                html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                        <h1 style="text-align: center; color: #333;">¡Gracias por tu compra!</h1>
                        
                        <h2 style="text-align: center; color: #333;">Has comprado: <em>${name}</em></h2>
                        
                        <p style="text-align: center; color: #333;">Aquí está la clave del juego que adquiriste:</p>
                        
                        <p style="text-align: center; font-size: 1.2em; font-weight: bold; color: #007bff;">${id_game}</p>
                        
                        <p style="text-align: center; color: #333;">¡Disfruta de tu juego al máximo!</p>
                        
                        <p style="text-align: center; font-style: italic; color: #555;">Con amor, GameKeyZone</p>
                    </div>
                </body>`,
            });

            return emailResult;
        });

        const emailResults = await Promise.all(emailPromises);

        return res.json({
            status: "success",
            message: "Revisa tu email 💌",
            emailResults,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Error al enviar el correo electrónico" });
    }
};
