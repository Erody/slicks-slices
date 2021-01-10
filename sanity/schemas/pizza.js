import { MdLocalPizza as icon } from 'react-icons/md';

export default {
    name: 'pizza',
    title: 'Pizzas',
    type: 'document',
    icon,
    preview: {
        select: {
            title: 'name',
            media: 'image',
            topping0: 'toppings.0.name',
            topping1: 'toppings.1.name',
            topping2: 'toppings.2.name',
            topping3: 'toppings.3.name',
        },
        prepare: ({ title, media, ...toppings }) => {
            // Filter undefined toppings out
            const tops = Object.values(toppings).filter(Boolean);
            // return the preview object for the pizza
            return {
                title,
                media,
                subtitle: tops.join(', '),
            };
        },
    },
    fields: [
        {
            name: 'name',
            title: 'Pizza Name',
            type: 'string',
            description: 'Name of the pizza',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
            },
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Price of the pizza in cents',
            validation: (Rule) => Rule.min(400).max(50000),
            // add custom input compononent
        },
        {
            name: 'toppings',
            title: 'Toppings',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'topping' }] }],
        },
    ],
};
