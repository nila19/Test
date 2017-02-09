
module.exports = {
	attributes: {
		firstName: {
			type: 'string',
			size: 128,
			required: true
		},
		lastName: {
			type: 'string',
			size: 128
		},
		contacts: {
			collection: 'Contact',
			via: 'person'
		}
	}
};
