import {
	INodeProperties,
} from 'n8n-workflow';

export const sessionOperations: INodeProperties[] = [
	{
		displayName: 'Action',
		name: 'action',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'profile',
				],
			},
		},
		options: [
			{
				name: 'Get Active Profile',
				value: 'getActiveProfile',
				description: 'Get the active profile data',
			},
			{
				name: 'Change active profile',
				value: 'changeActiveProfile',
				description: 'Change users\'s active profile',
			},
			{
				name: 'Get my profiles',
				value: 'getMyProfiles',
				description: 'Get all my profiles',
			},
		],
		default: '',
	},

	// ----------------------------------------
	//             profile: getActiveProfile
	// ----------------------------------------
	{
		displayName: 'Session token',
		name: 'sessionToken',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'getActiveProfile'
				],
		resource: [
					'profile',
				],
			},
		},
		default: '',
	},

	// ----------------------------------------
	//             profile: getMyProfiles
	// ----------------------------------------
	{
		displayName: 'Session token',
		name: 'sessionToken',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'getMyProfiles'
				],
		resource: [
					'profile',
				],
			},
		},
		default: '',
	},

	// ----------------------------------------
	//             profile: changeActiveProfile
	// ----------------------------------------
	{
		displayName: 'Session token',
		name: 'sessionToken',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'changeActiveProfile'
				],
		resource: [
					'profile',
				],
			},
		},
		default: '',
	},

]
