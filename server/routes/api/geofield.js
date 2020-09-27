const express = require("express");
const router = express.Router();
const passport = require("passport");

const fieldData = require("../../models/geofield");

// @route GET api/tasks/:id
// @desc Get tasks for specific project
// @access Private
// router.route('/').get((req, res) => {
//     fieldData.find()
//         .then(user => res.json(user))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

router.get('/', async (req, res) => {
//   try {
//     const transacted = await fieldData.find();

//     return res.status(200).json({
//         succes: true,
//         count: transacted.length,
//         data: transacted
// });
// } catch (err) {
//     return res.status(500).json({
//         success: false,
//         error: 'Server error'
// });
// }
fieldData.find()
.then(one => res.json(one))
.catch(err => err)
})

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
        let id = req.params.id;

        fieldData.find({ project: id }).then(fields => res.json(fields));
});

router.post(
  "/create",
   passport.authenticate("jwt", { session: false }),
     (req, res) => {
        try {
            const {project, user, longitude, latitude, elevation, locality, rockName, rockType, texture, color, 
            mineralogy, Dip, Strike, remark } = req.body
        const field = fieldData.create(req.body)
        return res.status(201).json({
            success: true,
            data: field
        });
        } catch (err) {
            if (err.name === 'ValidationError') {
                const messages = Object.values(err.errors).map(val => val.message);
    
                return res.status(403).json({
                    success: false,
                    error: messages
                });
            } else {
                return res.status(500).json({
                    success: false,
                    error: 'Server Error'
                })
            }
        }

        // const NEW_Field = new FieldData({
        //     project: req.body.project,
        //     user: req.body.user,
        //     longitude: req.body.longitude,
        //     latitude: req.body.latitude,
        //     elevation: req.body.elevation,
        //     locality: req.body.locality,
        //     rockName: req.body.rockName,
        //     rockType: req.body.rockType,
        //     mineralogy: req.body.mineralogy,
        //     texture: req.body.texture,
        //     color: req.body.color,
        //     Dip: req.body.Dip,
        //     Strike: req.body.Strike,
        //     remark: req.body.remark,
        //   });
      
        //   NEW_Field.save()
        //     .then(field => res.json(field))
        //     .catch(err => console.log(err));
        
  }
);

// @route POST api/tasks/delete
// @desc Delete an existing task
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    fieldData.findById(req.params.id).then(field => {
      field.remove().then(() => res.json({ success: true }));
    });
  }
);


// router.patch(
//   "/update/:id",
//   passport.authenticate("jwt", { session: false }),
//    (req, res) => {

//   fieldData.findById(req.params.id)
//       .then(dataFields => {
//         dataFields.user = req.body.user
//         dataFields.longitude = req.body.longitude
//         dataFields.latitude = req.body.latitude
//         dataFields.elevation = req.body.elevation
//         dataFields.locality = req.body.locality
//         dataFields.rockName = req.body.rockName
//         dataFields.rockType = req.body.rockType
//         dataFields.mineralogy = req.body.mineralogy
//         dataFields.texture = req.body.texture
//         dataFields.color = req.body.color
//         dataFields.Dip = req.body.Dip
//         dataFields.Strike = req.body.Strike
//         dataFields.remark = req.body.remark

//           dataFields.save()
//           .then(() => res.json('field updated!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       })
          
//       .catch(err => res.status(400).json('Error: ' + err));
// });


// @route PATCH api/tasks/update
// @desc Update an existing task
// @access Private
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
   (req, res) => {

    let dataFields = {};

    dataFields.user = req.body.user
    dataFields.longitude = req.body.longitude
    dataFields.latitude = req.body.latitude
    dataFields.elevation = req.body.elevation
    dataFields.locality = req.body.locality
    dataFields.rockName = req.body.rockName
    dataFields.rockType = req.body.rockType
    dataFields.mineralogy = req.body.mineralogy
    dataFields.texture = req.body.texture
    dataFields.color = req.body.color
    dataFields.Dip = req.body.Dip
    dataFields.Strike = req.body.Strike
    dataFields.remark = req.body.remark

    
    fieldData.findOneAndUpdate(
      { _id: req.body.id },
      { $set: dataFields },
      { new: true }
    )
      .then(task => {
        res.json(task);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
