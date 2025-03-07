const Client = require('../Models/ClientModel')
const HttpError = require('../Models/errorModel')


const getClients = async(req,res,next)=>{

    try {
        const clients = await Client.find();
        if(!clients){
            return res.status(200).json('No clients found.')
        }
        return res.status(200).json(clients);
    } catch (error) {
        return next(new HttpError("Error fetching clients.",500))
    }
}

const getClient = async(req,res,next)=>{
    const {id} = req.params;
    try {
        const client = await Client.findById(id);
        return res.status(200).json(client);
    } catch (error) {
        return next(new HttpError("Client not found",404));
    }
}

const updateClientProfile = async (req, res) => {
  const clientId = req.params.id;
  const { name, email, username, mobileNumber, businessName, profilePicture, backgroundImage } = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      clientId,
      {
        name,
        email,
        username,
        mobileNumber,
        businessName,
        profilePicture,
        backgroundImage,
      },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
  }; 

module.exports = {getClients,updateClientProfile,getClient};
