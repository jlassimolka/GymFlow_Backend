const Document = require('./document.model');
const CoachService = require('../coach/coach.service');
const GymService = require('../gym/gym.service');
const ManagerService = require('../manager/manager.service');
const AdherentService = require('../adherent/adherent.service');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure you have a folder called "uploads" in your project root
    },
    filename: function (req, file, cb) {
        const uniqueName = uuidv4() + path.extname(file.originalname); // Generate unique name using UUID and preserve file extension
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage }).single('file'); // Assuming you're uploading a single file

exports.saveDocument = async (req, res) => {
    upload(req, res, async (err) => {
        try {
            if (err) {
                return res.status(500).json({ message: 'Error uploading file', error: err });
            }
            
            // Access the uploaded file info
            const file = req.file;
            if (!file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Save file data to the database (you can adjust this based on your Document model schema)
            const document = new Document({
                originalName: file.originalname,
                fileName: file.filename,
                path: file.path,
                size: file.size,
                fileType: file.mimetype
            });

            profilePicture = await document.save();
            
            if(req.params.resources == 'coach'){
                CoachService.updateCoach(req.params.id,{profilePicture:profilePicture._id  });
            }
            if(req.params.resources == 'gym'){
                GymService.updateGym(req.params.id,{profilePicture:profilePicture._id  });
            }
            if(req.params.resources == 'manager'){
                ManagerService.updateManager(req.params.id,{profilePicture:profilePicture._id  });
            }

            if(req.params.resources == 'adherent'){
                AdherentService.updateAdherent(req.params.id,{profilePicture:profilePicture._id  });
            }
            // To do if req.params.resources == 'adherent'
            // To do if req.params.resources == 'manager'
            // To do if req.params.resources == 'responsable'

            res.status(201).json({ message: 'File uploaded successfully', file: file });
        } catch (error) {
            res.status(500).json({ message: 'Error saving file', error });
        }
    });
};

// Function to retrieve a file by filename
exports.getFile = async (req, res) => {
    try {
        const fileName = req.params.fileName;

        // Search for the document in the database
        const document = await Document.findOne({ fileName });
        if (!document) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Define the full path of the file
        const filePath = path.join(__dirname, '../uploads/', document.fileName);

        // Check if the file exists in the filesystem
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found on server' });
        }

        // Send the file as a response
        res.sendFile(filePath);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving file', error });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const fileName = req.params.fileName;

        // Search for the document in the database
        const document = await Document.findOne({ fileName });
        if (!document) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Define the full path of the file
        const filePath = path.join(__dirname, '../uploads/', document.fileName);

        // Check if the file exists on the filesystem
        if (fs.existsSync(filePath)) {
            // Delete the file from the filesystem
            fs.unlinkSync(filePath);
        }

        // Remove the document from the database
        await Document.deleteOne({ _id: document._id });

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting file', error });
    }
};