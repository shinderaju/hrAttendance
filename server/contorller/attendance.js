var express = require('express'),
    router = express.Router();
var firebase = require('../config/config.js');

router.post('/', function (req, res) {
    console.log("inside attendance ");
    console.log(req.body);
    // console.log(req.body.user);
    // var db = firebase.database();
    // var ref = db.ref("AttendanceData");
    // var postsRef = ref.child("sheetData");
    //
    // postsRef.once('value', function (snapshot) {
    //     console.log(snapshot.val());
    //     var d = snapshot.val();
    //     var userData = {
    //                 attendance: d
    //             }
    //      res.send(userData);
    // }); //end of postsRef.once
});
module.exports = router;
