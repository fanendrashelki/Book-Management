import Book from '../model/bookModel.js'

export const create = async( req, res)=>{
  try{
      const bookData = new Book(req.body);
      if(!bookData){
        return res.status(404).json({msg: " Book data not found"});
      }
      const savedData= await bookData.save();
      res.status(200).json({ msg: "Book created successfully", data: savedData });

  }catch(error){
res.status(500).json({error:error});
  }
}

export const getAll = async(req , res)=>{
  try{
    const bookData = await Book.find();
    if(!bookData){
      return res.status(404).json({msg: " Book data not found"});
    }
    res.status(200).json(bookData);

  }catch(error){
    res.status(500).json({error:error});
  }
}

export  const getOne = async(req,res)=>{
  try {
    const id = req.params.id;
    const bookExist= await Book.findById(id);
    if(!bookExist){
      return res.status(404).json({msg: " Book not found"});
    }
    res.status(200).json(bookExist);
  } catch (error) {
    res.status(500).json({error:error});
  }
}

export const update = async(req, res)=>{
  try {
    const id = req.params.id;
    const bookExist= await Book.findById(id);
    if(!bookExist){
      return res.status(401).json({msg: " Book not found"});
    }
    const updatedData = await Book.findByIdAndUpdate(id , req.body, {new:true});
    
    res.status(200).json({ msg: "Book updated successfully", data: updatedData });

  } catch (error) {
    res.status(500).json({error:error});
  }
}

export const deleteBook = async(req , res)=>{

  try {
    const id = req.params.id;
    const bookExist= await Book.findById(id);
    if(!bookExist){
      return res.status(404).json({msg: " Book not found"});
    }
    await Book.findByIdAndDelete(id);
    res.status(200).json({msg:"Book deleted successfully"})
  } catch (error) {
    res.status(500).json({error:error});
  }
}