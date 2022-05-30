import {
	INodeProperties,
} from 'n8n-workflow';

export const computerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
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
				value: 'get',
				description: 'Delete an item',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all items',
			},
		],
		default: '',
	},

			// ----------------------------------------
			//             Computer: create
			// ----------------------------------------
			{
				displayName: 'Session token',
				name: 'sessionToken',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create', 'update', 'delete', 'get', 'getAll',
						],
					resource: [
							'computer',
						],
					},
				},
				default: '',
			},

			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
						show: {
								resource: [
										'computer',
								],
								operation: [
										'create', 'update', 'get', 'getAll'
								],
						},
				},
				options: [
						{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
						},
						{
								displayName: 'Serial Number',
								name: 'serial',
								type: 'string',
								default: '',
						},
						{
							displayName: 'Inventory number',
							name: 'otherserial',
							type: 'string',
							default: '',
					},
					{
						displayName: 'Entity ID',
						name: 'entities_id',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Manufacturer ID',
						name: 'manufacturers_id',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Model ID',
						name: 'computermodels_id',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Type ID',
						name: 'computertypes_id',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Location OD',
						name: 'locations_id',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Contact',
						name: 'contact',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Contact num',
						name: 'contact_num',
						type: 'string',
						default: '',
				},
				{
					displayName: 'Comment',
					name: 'comment',
					type: 'string',
					default: '',
				},
			],
			},

			// ----------------------------------------
			//             Computer: delete
			// ----------------------------------------
			{
				displayName: 'Computer ID',
				name: 'id',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'delete', 'get'
						],
					resource: [
							'computer',
						],
					},
				},
				default: '',
			},

			// ----------------------------------------
			//             Computer: get
			// ----------------------------------------

			// ----------------------------------------
			//             Computer: getAll
			// ----------------------------------------


]
