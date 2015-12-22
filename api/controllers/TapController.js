/**
 * TapController
 *
 * @description :: Server-side logic for managing taps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	tap: function(req, res) {
	    var data = { side: req.params.all()['side'] };
	    //res.json(req.params.all());
	    
	    Tap.findOrCreate(data, data, function(err, record) {
	        console.log(record);
    	    record.taps += 1;
    	    record.save();
    	    sails.sockets.blast(record);
    	    res.json(record);
	    });
	}
};

