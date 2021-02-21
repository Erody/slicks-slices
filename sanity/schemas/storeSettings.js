import { Mdstore as icon } from 'react-icons/md';

export default {
    // Computer Name
    name: 'storeSettings',
    // visible title
    title: 'Settings',
    type: 'document',
    icon,
    fields: [
        {
            name: 'name',
            title: 'Store name',
            type: 'string',
            description: 'Name of the store',
        },
        {
            name: 'slicemasters',
            title: 'Slicemasters Currently Slicing',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'person' }] }],
        },
        {
            name: 'hotSlices',
            title: 'Hot Slices available in the case',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
        },
    ],
};
