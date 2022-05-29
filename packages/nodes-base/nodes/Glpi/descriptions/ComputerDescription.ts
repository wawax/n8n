import {
	INodeProperties,
} from 'n8n-workflow';

export const computerOperations: INodeProperties[] = [
	{
		displayName: 'Action',
		name: 'action',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'computer',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an item',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an item',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an item',
			},
			{
				name: 'Get',
				value: 'Get',
				description: 'Delete an item',
			},
		],
		default: 'get',
	},
]
