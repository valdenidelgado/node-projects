const Pet = require('../models/Pet');
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PetController {
    static async create(req, res) {
        const { name, age, weight, color } = req.body;

        const images = req.files;

        const available = true;

        // images upload

        // validations
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        if (!age) {
            return res.status(400).json({ message: "Age is required" });
        }

        if (!weight) {
            return res.status(400).json({ message: "Weight is required" });
        }

        if (!color) {
            return res.status(400).json({ message: "Color is required" });
        }

        if (images.length === 0) {
            return res.status(400).json({ message: "A image is required" });
        }

        // get pet owner
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            }
        })
        
        try {
            const newPet = await pet.save();

            res.status(201).json({
                message: "Pet created successfully",
                pet: newPet
            });
        } catch (e) {
            res.status(500).json({ message: e });
        }

        images.map(image => {
            pet.images.push(image.filename);
        })

        res.status(201).json(pet);
    }

    static async getAll(req, res) {
        try {
            const pets = await Pet.find().sort('-createdAt');
            res.status(200).json(pets);
        } catch (e) {
            res.status(500).json({ message: e });
        }
    }

    static async getAllUserPets(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);

        try {
            const pets = await Pet.find({ "user._id": user._id }).sort('-createdAt');
            res.status(200).json(pets);
        } catch (e) {
            res.status(500).json({ message: e });
        }
    }

    static async getAllUserAdoptions(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);

        try {
            const pets = await Pet.find({ "adopter.user._id": user._id }).sort('-createdAt');
            res.status(200).json(pets);
        } catch (e) {
            res.status(500).json({ message: e });
        }
    }

    static async getPetById(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        // check if pet exists
        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        res.status(200).json(pet);
    }

    static async removePetById(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        // check if pet exists
        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        // check if user is the owner of the pet
        const token = getToken(req);
        const user = await getUserByToken(token);

        if (pet.user._id.toString() !== user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await Pet.findByIdAndDelete(id);

        res.status(200).json({ message: "Pet removed successfully" });
    }

    static async updatePet(req, res) {
        const id = req.params.id

        const { name, age, weight, color, available } = req.body;

        const images = req.files;

        const updatedData = {};

        // check if pet exists
        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        // check if user is the owner of the pet
        const token = getToken(req);
        const user = await getUserByToken(token);

        if (pet.user._id.toString() !== user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // validations
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        } else {
            updatedData.name = name;
        }

        if (!age) {
            return res.status(400).json({ message: "Age is required" });
        } else {
            updatedData.age = age;
        }

        if (!weight) {
            return res.status(400).json({ message: "Weight is required" });
        } else {
            updatedData.weight = weight;
        }

        if (!color) {
            return res.status(400).json({ message: "Color is required" });
        } else {
            updatedData.color = color;
        }

        if (images.length === 0) {
            return res.status(400).json({ message: "A image is required" });
        } else {
            updatedData.images = [];
            images.map(image => {
                updatedData.images.push(image.filename);
            }
        }

        await Pet.findByIdAndUpdate(id, updatedData);

        res.status(200).json({ message: "Pet updated successfully" }
    }

    static async schedule(req, res) {
        const id = req.params.id

        const { date, time } = req.body;

        // check if pet exists
        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        // check if user is the owner of the pet
        const token = getToken(req);
        const user = await getUserByToken(token);

        if (pet.user._id.equals(user._id)) {
            return res.status(422).json({ message: "You can't schedule visit with your pet" });
        }

        // check if user has already scheduled a visit
        if(pet.adopter) {
            if(pet.adopter._id.equals(user._id)) {
                return res.status(422).json({ message: "You already scheduled a visit with this pet" });
            }
        }

        //add user to pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet);

        res.status(200).json({ message: "Visit scheduled successfully" });
    }

    static async concludeAdoption(req, res) {
        const id = req.params.id

        // check if pet exists
        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if (pet.user._id.toString() !== user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        pet.available = false;

        await Pet.findByIdAndUpdate(id, pet);

        res.status(200).json({ message: "Adoption concluded successfully" });
    }
}