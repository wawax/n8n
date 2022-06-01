import {
	INodeProperties,
} from 'n8n-workflow';

export const customOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'custom',
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
			//             custom: create
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
							'custom',
						],
					},
				},
				default: '',
			},
			{
				displayName: 'Itemtype',
				name: 'itemtype',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create', 'update', 'delete', 'get', 'getAll',
						],
					resource: [
							'custom',
						],
					},
				},
				default: '',
			},

			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'update', 'delete', 'get',
						],
					resource: [
							'custom',
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
										'custom',
								],
								operation: [
										'create', 'update',
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
						name: 'custommodels_id',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Type ID',
						name: 'customtypes_id',
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
				// {
				// 	displayName: 'ID',
				// 	name: 'id',
				// 	type: 'number',
				// 	default: '',
				// },
			],
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
										'custom',
								],
								operation: [
										'get',
								],
						},
				},
				options: [
						{
								displayName: 'expand_dropdowns',
								name: 'expand_dropdowns',
								type: 'boolean',
								default: false,
						},
						{
								displayName: 'get_hateoas',
								name: 'get_hateoas',
								type: 'boolean',
								default: true,
						},
						{
							displayName: 'get_sha1',
							name: 'get_sha1',
							type: 'boolean',
							default: false,
					},
					{
						displayName: 'with_devices',
						name: 'with_devices',
						type: 'boolean',
						default: false,
					},
			],
			},

]
