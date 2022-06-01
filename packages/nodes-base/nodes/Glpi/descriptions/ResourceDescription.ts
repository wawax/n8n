import {
	INodeProperties,
} from 'n8n-workflow';

export const resourceDescription: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Session',
				value: 'session',
			},
			{
				name: 'Profile',
				value: 'profile',
			},
			{
				name: 'Computer',
				value: 'computer',
			},
			{
				name: 'Custom',
				value: 'custom',
			},
		],
		default: '',
		required: true,
	},
]
