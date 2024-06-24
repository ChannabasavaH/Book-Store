import Book from '../models/bookSchema.js';

const checkOwner = async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (book.createdBy !== req.user.uid) {
    return res.status(403).json({ message: 'Permission denied' });
  }

  next();
};

export default checkOwner;
