'use strict';

var Readable = require('stream').Readable;
var inherits = require('util').inherits;

/**
 * return a new subscription evnet 
 * real APIs would care about the 'event'
 * @param  {[type]} event   [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
exports.subscribe = function(event, options){
	return Subscription(options);
};

/**
 * subscription stream. just increments the result.
 * never ends!
 */
inherits(Subscription, Readable);

function Subscription(options){
	if (!(this instanceof Subscription)){
		return new Subscription((options));
	}

	options = options || {};
	Readable.call(this, options);

	this.value = 0;
}

Subscription.prototype._read = function(){
	while(this.push(String(this.value++))){}
};
