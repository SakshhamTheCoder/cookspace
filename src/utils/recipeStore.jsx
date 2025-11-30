import { getLocalRecipes } from './localRecipes';

const items = [
    {
        id: 1,
        isLocal: false,
        name: 'American Burger',
        description: 'A delicious and juicy burger perfect for any occasion.',
        timeToCook: '30 mins',
        serves: 2,
        image: '/american_burger.png',
        ingredients: [
            '500g ground chicken',
            '4 burger buns',
            'Lettuce leaves',
            '2 tomatoes, sliced',
            '4 slices of cheddar cheese',
            'Salt and pepper to taste',
            'Ketchup, mustard, mayonnaise (optional)',
        ],
        steps: [
            'Prepare the burger patties by mixing ground chicken with salt and pepper.',
            'Shape into patties and cook on a grill or skillet until desired doneness.',
            'Toast the burger buns lightly.',
            'Assemble the burger: Place lettuce, tomato, cheese, and patty on the bun.',
            'Add condiments like ketchup, mustard, and mayonnaise as desired.',
            'Top with the other half of the bun and serve hot.',
        ],
    },
    {
        id: 2,
        isLocal: false,
        name: 'Rice Idli',
        description: 'A traditional South Indian breakfast item made from fermented rice and lentil batter.',
        timeToCook: '20 mins',
        serves: 4,
        image: '/rice_idli.png',
        steps: [
            'Soak rice and urad dal separately for 4-6 hours.',
            'Grind both to a smooth batter and mix together.',
            'Allow the batter to ferment overnight.',
            'Pour the batter into greased idli molds.',
            'Steam for 10-12 minutes until idlis are cooked and fluffy.',
            'Serve hot with chutney and sambar.',
        ],
    },
    {
        id: 3,
        isLocal: false,
        name: 'Vada Pav',
        description:
            'A popular Indian street food consisting of a spicy potato filling sandwiched between a bread roll.',
        timeToCook: '15 mins',
        serves: 2,
        image: '/vada_pav.png',
        steps: [
            'Boil and mash potatoes, then mix with spices and herbs.',
            'Shape into balls and dip in gram flour batter.',
            'Deep fry until golden and crispy.',
            'Slice pav buns and spread chutney inside.',
            'Place the vada inside the pav and press gently.',
            'Serve hot with fried green chilies.',
        ],
    },
    {
        id: 4,
        isLocal: false,
        name: 'Ramen Noodles',
        description: 'A flavorful Japanese noodle soup dish with a rich broth and various toppings.',
        timeToCook: '45 mins',
        serves: 4,
        image: '/ramen_noodles.png',
        steps: [
            'Prepare the broth by simmering chicken, garlic, ginger, and soy sauce.',
            'Cook ramen noodles according to package instructions.',
            'Slice toppings such as boiled eggs, green onions, and mushrooms.',
            'Pour hot broth over noodles in a bowl.',
            'Add toppings and drizzle with sesame oil.',
            'Serve immediately while hot.',
        ],
    },
];

export function getAllRecipes() {
    return [...items, ...getLocalRecipes()];
}

