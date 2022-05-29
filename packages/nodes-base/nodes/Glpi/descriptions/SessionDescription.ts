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
					'session',
				],
			},
		},
		options: [
			{
				name: 'Login',
				value: 'login',
				description: 'Login into GLPI',
			},
			{
				name: 'Logout',
				value: 'logout',
				description: 'Logout from GLPI',
			},
		],
		default: 'login',
	},
	{
		displayName: 'Session token',
		name: 'sessionToken',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'logout',
				],
				resource: [
					'session',
				],
			},
		},
		default: 'logout',
	},
]

