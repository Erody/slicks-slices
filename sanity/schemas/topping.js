import { FaPepperHot as icon } from 'react-icons/fa';

export default {
    name: 'topping',
    title: 'Toppings',
    type: 'document',
    icon,
    preview: {
        select: {
            name: 'name',
            vegetarian: 'vegetarian',
        },
        prepare: ({ name, vegetarian }) => ({
            title: `${name} ${vegetarian ? '🥬' : ''}`,
        }),
    },
    fields: [
        {
            name: 'name',
            title: 'Topping Name',
            type: 'string',
            description: 'What is the name of the topping?',
        },
        {
            name: 'vegetarian',
            title: 'Vegetarian',
            type: 'boolean',
            description: 'Is the topping vegetarian?',
            options: {
                layout: 'checkbox',
            },
        },
    ],
};
