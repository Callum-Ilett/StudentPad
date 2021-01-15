// userRouter.post("/contacts/add", (req, res) => {
//   const { contactID, userID } = req.body;
//   const update = { $push: { contact_list: contactID } };

//   User.findByIdAndUpdate(userID, update, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data.contact_list);
//     }
//   });
// });

import axios from "axios";

const userService = {
  AddNewContact: async (userID, contactID) => {
    try {
      return await axios.post(`/user/contacts/add`, { userID, contactID });
    } catch (error) {
      return error.response;
    }
  },

  GetCompanyDetailsByEmail: async (email) => {
    try {
      return await axios.get(`/user/branch/${email}`);
    } catch (error) {
      return error.response;
    }
  },
};

export default userService;
