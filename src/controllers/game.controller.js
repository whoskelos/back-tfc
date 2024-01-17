import Game from "../models/game.model.js";
import { uploadFile } from "../util/uploadFile.js";
/**
 * Inserta un nuevo juego en mongoDB
 * @param {*} req Request con los datos del juego que llegan del cliente
 * @param {*} res Retorna el objeto con los datos si se ha creado correctamente
 */
export const createGame = async (req, res) => {
    const {
        slug,
        name,
        rating,
        price,
        store_slug,
        store_name,
        description,
        requirements,
    } = req.body;
    const image = req.files.image;
    try {
        if (image && image.length > 0) {
            const { downloadURL } = await uploadFile(image[0]);
            const newGame = new Game({
                slug,
                name,
                rating,
                background_image: downloadURL,
                price,
                store: {
                    slug: store_slug,
                    name: store_name,
                },
                description,
                requirements,
            });
            newGame.save();
            return res.status(200).json({
                status: "success",
                message: "Juego creado correctamente",
            });
        }

        return res
            .status(400)
            .json({ status: "failed", message: "Debes enviar una imagen" });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: "failed", message: "Error al crear nuevo juego" });
    }
};

/**
 * Obtiene el listado de los juegos disponibles
 * @param {*} res Retorna el status de la peticion
 */
export const getGames = async (__, res) => {
    try {
        const games = await Game.find().sort({ createdAt: -1 });
        res.status(200).json({ games });
    } catch (error) {
        res.status(400).json({ message: "Ocurrió un error", error });
    }
};

/**
 *
 * @param {*} req ID del juego a buscar
 * @param {*} res Retorna el juego en caso de encontrarlo o un mensaje de error
 */

export const getGameById = async (req, res) => {
    const { slug } = req.params;
    try {
        const game = await Game.findOne({ slug: slug });
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({ message: "Juego no encontrado" });
    }
};

export const deleteGameById = async (req, res) => {
    const { id } = req.body;
    try {
        const resp = await Game.deleteOne({ id_game: id });
        if (resp.deletedCount === 1) {
            return res.status(200).json({
                status: "success",
                message: "Eliminado correctamente",
            });
        } else {
            res.status(404).json({
                message: "No se ha encontrado ese documento",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed", error });
    }
};

export const updateGame = async (req, res) => {
    const { store_slug, store_name } = req.body;
    try {
        let updateData = { ...req.body };
        const store = JSON.parse(updateData.store);
        if (store_slug && store_name) {
            updateData.store = {
                slug: store_slug,
                name: store_name,
            };
        } else {
            updateData.store = {
                slug: store.slug,
                name: store.name,
            };
        }
        if (req.files && req.files.image && req.files.image.length > 0) {
            const { downloadURL } = await uploadFile(req.files.image[0]);

            updateData.background_image = downloadURL;
        }

        const game = await Game.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });

        if (!game) {
            return res
                .status(400)
                .json({ status: "failed", message: "Juego no encontrado" });
        }

        return res.status(200).json({
            status: "success",
            message: "Juego actualizado correctamente",
        });
    } catch (error) {
        return res.status(500).json({ status: "failed", error: error.message });
    }
};
