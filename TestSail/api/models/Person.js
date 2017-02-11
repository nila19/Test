
module.exports = {
	attributes: {
		firstName: {
			type: 'string',
			size: 128,
			required: true
		},
		lastName: {
			type: 'string',
			size: 128,
			required: true
		},
		email: {
			type: 'string',
			email: true,
			required: true,
			unique: true
		},
		password: {
			type: 'string',
			size: 128,
			required: true
		},
		lastLoggedIn: {
			type: 'date',
			defaultsTo: new Date(0)
		},
		contacts: {
			collection: 'Contact',
			via: 'person'
		}
	}
};
