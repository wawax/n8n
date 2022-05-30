import {
	INodeProperties,
} from 'n8n-workflow';

export const profileOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
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
	{
		displayName: 'Session token',
		name: 'sessionToken',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'getActiveProfile', 'changeActiveProfile', 'getMyProfiles'
				],
				resource: [
					'profile',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'profiles_id',
		name: 'profiles_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'changeActiveProfile',
				],
				resource: [
					'profile',
				],
			},
		},
		default: '',
	},
]
