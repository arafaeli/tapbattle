/**
 * TapController
 *
 * @description :: Server-side logic for managing taps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	tap: function(req, res) {
	    params = req.params.all();
	    console.log(params['side']);
	    if(params['side'] == undefined) return res.notFound();
	    
	    var data = { side: params['side'] };
        console.log('tap '+data['side']);
	    
	    Tap.findOrCreate(data, data, function(err, record) {
    	    record.taps += 1;
    	    record.save();
    	    sails.sockets.blast(record);
    	    res.json(record);
	    });
	},
	
	count: function(req, res) {
	    var data = [
	        { side: 'left'},
	        { side: 'right'}
	    ];
	    
	    Tap.findOrCreate(data, data, function(err, records) {
	        for (r of records) r.save();
    	    res.json(records);
	    });
	}
};

