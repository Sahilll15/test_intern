const multer = require('multer');

// Define storage for multer
const storage = multer.memoryStorage(); // Use memory storage to store the file in memory as a buffer

// Set up multer middleware
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit the file size to 5 MB (adjust as needed)
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more allowed MIME types as needed

        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Invalid file type'), false); // Reject the file
        }
    },
})

module.exports = upload;
