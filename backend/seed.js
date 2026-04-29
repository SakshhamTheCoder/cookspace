import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Recipe from './models/Recipe.js';

dotenv.config();

const items = [
    {
        name: 'American Burger',
        description: 'A delicious and juicy burger perfect for any occasion.',
        cookingTime: '30 mins',
        serves: 2,
        image: '/american_burger.png',
        ingredients: [
            {item: 'Ground chicken', quantity: '500g'},
            {item: 'Burger buns', quantity: '4'},
            {item: 'Lettuce leaves', quantity: '4-6'},
            {item: 'Tomato slices', quantity: '6-8'},
            {item: 'Cheddar cheese', quantity: '4 slices'},
            {item: 'Salt', quantity: '1 tsp'},
            {item: 'Black pepper', quantity: '1 tsp'},
            {item: 'Paprika', quantity: '1 tsp'},
            {item: 'Butter', quantity: '2 tbsp'},
            {item: 'Condiments', quantity: 'as required'}
        ],
        steps: [
            'Mix ground chicken with salt, pepper, and paprika in a bowl.',
            'Divide into equal portions and shape into patties.',
            'Heat a skillet or grill and cook patties for 4-5 minutes per side.',
            'Place cheese slices over patties and let them melt.',
            'Slice and butter the burger buns.',
            'Toast the buns on a skillet until lightly golden.',
            'Layer lettuce and tomato slices on the bottom bun.',
            'Place the cooked cheese patty on top.',
            'Add ketchup, mayo, or mustard as desired.',
            'Cover with the top bun and serve immediately.',
        ],
        tags: ["Fast Food", "Dinner"]
    },
    {
        name: 'Rice Idli',
        description: 'A traditional South Indian steamed breakfast made using fermented batter.',
        cookingTime: '20 mins',
        serves: 4,
        image: '/rice_idli.png',
        ingredients: [
            {item: 'Rice', quantity: '2 cups'},
            {item: 'Urad dal', quantity: '1 cup'},
            {item: 'Salt', quantity: '1-2 tsp'},
            {item: 'Oil', quantity: '1 tbsp for greasing'},
            {item: 'Water', quantity: 'as required'}
        ],
        steps: [
            'Soak rice and urad dal separately for 4-6 hours.',
            'Grind urad dal into a smooth fluffy batter.',
            'Grind rice into a slightly coarse batter.',
            'Mix both batters with salt and ferment overnight.',
            'Grease idli plates lightly with oil.',
            'Pour fermented batter into molds.',
            'Steam for 10-12 minutes on medium flame.',
            'Allow to cool for 2 minutes before removing.',
            'Serve warm with coconut chutney.',
            'Enjoy with hot sambar for a complete meal.',
        ],
        tags: ["Breakfast", "Indian", "Healthy"]
    },
    {
        name: 'Vada Pav',
        description: 'A popular Indian street food with spicy potato vada stuffed inside soft pav.',
        cookingTime: '15 mins',
        serves: 2,
        image: '/vada_pav.png',
        ingredients: [
            {item: 'Pav buns', quantity: '4'},
            {item: 'Boiled potatoes', quantity: '3 medium'},
            {item: 'Garlic paste', quantity: '1 tsp'},
            {item: 'Green chilies', quantity: '2 finely chopped'},
            {item: 'Turmeric', quantity: '1/2 tsp'},
            {item: 'Gram flour (besan)', quantity: '1 cup'},
            {item: 'Red chili powder', quantity: '1 tsp'},
            {item: 'Salt', quantity: '1 tsp'},
            {item: 'Oil', quantity: 'for frying'},
            {item: 'Chutney', quantity: 'as required'}
        ],
        steps: [
            'Mash boiled potatoes and mix with spices.',
            'Shape the mixture into round balls.',
            'Prepare a thick besan batter.',
            'Dip potato balls into the batter.',
            'Deep fry until golden and crisp.',
            'Slice pav buns and spread chutney.',
            'Place the hot vada inside the pav.',
            'Press gently to set the filling.',
            'Serve with fried green chilies.',
            'Enjoy hot as a snack or lunch.',
        ],
        tags: ["Snack", "Indian", "Vegetarian"]
    },
    {
        name: 'Ramen Noodles',
        description: 'A warm Japanese noodle bowl with rich broth and flavorful toppings.',
        cookingTime: '45 mins',
        serves: 4,
        videoUrl: 'https://youtube.com/embed/6ekYXw-H9l4',
        image: '/ramen_noodles.png',
        ingredients: [
            {item: 'Ramen noodles', quantity: '4 packs'},
            {item: 'Chicken broth', quantity: '4 cups'},
            {item: 'Garlic', quantity: '4 cloves'},
            {item: 'Ginger', quantity: '1 inch piece'},
            {item: 'Soy sauce', quantity: '3 tbsp'},
            {item: 'Boiled eggs', quantity: '4 halves'},
            {item: 'Spring onions', quantity: '1 cup chopped'},
            {item: 'Mushrooms', quantity: '1 cup sliced'},
            {item: 'Sesame oil', quantity: '1 tbsp'}
        ],
        steps: [
            'Simmer garlic, ginger, and soy sauce in broth.',
            'Cook for 20-25 minutes.',
            'Strain the broth.',
            'Boil ramen noodles and drain.',
            'Prepare toppings.',
            'Place noodles in bowls.',
            'Pour hot broth over noodles.',
            'Add toppings neatly.',
            'Drizzle sesame oil.',
            'Serve immediately.',
        ],
        tags: ["Dinner", "Asian", "Soup"]
    },
    {
        name: 'Margherita Pizza',
        description: 'A classic Italian pizza topped with cheese, tomatoes, and basil.',
        cookingTime: '25 mins',
        serves: 2,
        image: '/margherita_pizza.png',
        ingredients: [
            {item: 'Pizza dough', quantity: '1 base'},
            {item: 'Tomato sauce', quantity: '1/2 cup'},
            {item: 'Mozzarella cheese', quantity: '1 cup'},
            {item: 'Olive oil', quantity: '1 tbsp'},
            {item: 'Fresh basil', quantity: '6-8 leaves'},
            {item: 'Salt', quantity: '1/2 tsp'},
            {item: 'Oregano', quantity: '1 tsp'},
            {item: 'Chili flakes', quantity: '1/2 tsp'}
        ],
        steps: [
            'Preheat oven to 220°C.',
            'Spread tomato sauce evenly.',
            'Add mozzarella cheese.',
            'Place basil leaves on top.',
            'Drizzle olive oil.',
            'Sprinkle seasoning.',
            'Bake for 10-12 minutes.',
            'Remove from oven.',
            'Slice into pieces.',
            'Serve hot.',
        ],
        tags: ["Dinner", "Italian", "Vegetarian"]
    },
    {
        name: 'Chocolate Brownies',
        description: 'Soft, fudgy brownies with rich chocolate flavor.',
        cookingTime: '35 mins',
        serves: 6,
        image: '/chocolate_brownies.png',
        ingredients: [
            {item: 'Dark chocolate', quantity: '200g'},
            {item: 'Butter', quantity: '100g'},
            {item: 'Sugar', quantity: '1 cup'},
            {item: 'Flour', quantity: '3/4 cup'},
            {item: 'Cocoa powder', quantity: '2 tbsp'},
            {item: 'Eggs', quantity: '2'},
            {item: 'Vanilla essence', quantity: '1 tsp'},
            {item: 'Salt', quantity: 'a pinch'}
        ],
        steps: [
            'Preheat oven to 180°C.',
            'Melt chocolate and butter.',
            'Add sugar and mix.',
            'Add eggs and vanilla.',
            'Sift dry ingredients.',
            'Fold everything together.',
            'Pour into baking tray.',
            'Bake 20-25 mins.',
            'Cool completely.',
            'Cut and serve.',
        ],
        tags: ["Dessert", "Baking"]
    },
    {
        name: 'Paneer Butter Masala',
        description: 'A creamy and delicious Indian curry made with paneer and butter.',
        cookingTime: '30 mins',
        serves: 3,
        image: '/paneer_butter_masala.png',
        ingredients: [
            {item: 'Paneer cubes', quantity: '200g'},
            {item: 'Butter', quantity: '2 tbsp'},
            {item: 'Tomato puree', quantity: '1 cup'},
            {item: 'Cream', quantity: '1/4 cup'},
            {item: 'Onion paste', quantity: '1/2 cup'},
            {item: 'Ginger-garlic paste', quantity: '1 tbsp'},
            {item: 'Red chili powder', quantity: '1 tsp'},
            {item: 'Garam masala', quantity: '1/2 tsp'},
            {item: 'Salt', quantity: 'to taste'}
        ],
        steps: [
            'Heat butter in a pan.',
            'Add onion paste and sauté.',
            'Add ginger-garlic paste.',
            'Pour tomato purée.',
            'Add spices.',
            'Add paneer cubes.',
            'Mix cream.',
            'Simmer 5 minutes.',
            'Rest 2 minutes.',
            'Serve hot.',
        ],
        tags: ["Dinner", "Indian", "Vegetarian"]
    },
    {
        name: 'Pasta Alfredo',
        description: 'A creamy Italian pasta made with butter, cream, and parmesan.',
        cookingTime: '20 mins',
        serves: 2,
        image: '/pasta_alfredo.png',
        ingredients: [
            {item: 'Fettuccine pasta', quantity: '250g'},
            {item: 'Butter', quantity: '2 tbsp'},
            {item: 'Heavy cream', quantity: '1 cup'},
            {item: 'Parmesan cheese', quantity: '1/2 cup grated'},
            {item: 'Garlic', quantity: '2 cloves minced'},
            {item: 'Salt', quantity: '1 tsp'},
            {item: 'Black pepper', quantity: '1 tsp'},
            {item: 'Parsley', quantity: '1 tbsp chopped'}
        ],
        steps: [
            'Boil pasta until al dente.',
            'Melt butter in a pan.',
            'Add garlic and sauté.',
            'Pour in cream and heat.',
            'Add parmesan and mix.',
            'Season with salt and pepper.',
            'Add cooked pasta.',
            'Mix gently to coat.',
            'Garnish with parsley.',
            'Serve hot.',
        ],
        tags: ["Dinner", "Italian"]
    },
    {
        name: 'Chicken Tikka',
        description: 'A spicy grilled chicken appetizer popular in Indian cuisine.',
        cookingTime: '35 mins',
        serves: 3,
        image: '/chicken_tikka.png',
        ingredients: [
            {item: 'Chicken cubes', quantity: '300g'},
            {item: 'Curd', quantity: '1/2 cup'},
            {item: 'Ginger-garlic paste', quantity: '1 tbsp'},
            {item: 'Turmeric', quantity: '1/2 tsp'},
            {item: 'Red chili powder', quantity: '1 tsp'},
            {item: 'Garam masala', quantity: '1/2 tsp'},
            {item: 'Salt', quantity: '1 tsp'},
            {item: 'Oil', quantity: '1 tbsp'}
        ],
        steps: [
            'Mix curd and spices in a bowl.',
            'Marinate chicken for 1 hour.',
            'Preheat grill or pan.',
            'Drizzle oil onto surface.',
            'Place marinated chicken.',
            'Cook until brown on all sides.',
            'Check doneness inside.',
            'Remove from heat.',
            'Squeeze lemon on top.',
            'Serve with mint chutney.',
        ],
        tags: ["Appetizer", "Indian"]
    },
    {
        name: 'Cold Coffee',
        description: 'A refreshing chilled coffee drink blended with ice cream.',
        cookingTime: '10 mins',
        serves: 1,
        image: '/cold_coffee.png',
        ingredients: [
            {item: 'Milk', quantity: '1 cup'},
            {item: 'Instant coffee', quantity: '1 tbsp'},
            {item: 'Sugar', quantity: '2 tbsp'},
            {item: 'Ice cubes', quantity: '5-6'},
            {item: 'Vanilla ice cream', quantity: '1 scoop'},
            {item: 'Chocolate syrup', quantity: '1 tbsp'}
        ],
        steps: [
            'Add coffee, sugar, and milk to blender.',
            'Add ice cubes.',
            'Blend until frothy.',
            'Pour into glass.',
            'Add vanilla ice cream.',
            'Drizzle chocolate syrup.',
            'Stir lightly.',
            'Add extra ice if needed.',
            'Serve chilled.',
            'Enjoy the refreshing drink.',
        ],
        tags: ["Drink", "Dessert"]
    },
    {
        name: 'Veg Fried Rice',
        description: 'A quick stir-fried rice dish with vegetables and soy sauce.',
        cookingTime: '20 mins',
        serves: 2,
        image: '/veg_fried_rice.png',
        ingredients: [
            {item: 'Cooked rice', quantity: '2 cups'},
            {item: 'Carrots', quantity: '1/4 cup chopped'},
            {item: 'Beans', quantity: '1/4 cup chopped'},
            {item: 'Capsicum', quantity: '1/4 cup chopped'},
            {item: 'Soy sauce', quantity: '1 tbsp'},
            {item: 'Vinegar', quantity: '1 tsp'},
            {item: 'Salt', quantity: '1 tsp'},
            {item: 'Pepper', quantity: '1/2 tsp'}
        ],
        steps: [
            'Heat oil in wok.',
            'Add vegetables.',
            'Stir fry 2-3 mins.',
            'Add cooked rice.',
            'Mix gently.',
            'Add soy sauce and vinegar.',
            'Season with salt and pepper.',
            'Toss everything well.',
            'Cook for 2 more mins.',
            'Serve hot.',
        ],
        tags: ["Dinner", "Asian", "Vegetarian"]
    },
    {
        name: 'Pancakes',
        description: 'Fluffy breakfast pancakes served with maple syrup.',
        cookingTime: '15 mins',
        serves: 2,
        image: '/pancakes.png',
        ingredients: [
            {item: 'Flour', quantity: '1 cup'},
            {item: 'Milk', quantity: '3/4 cup'},
            {item: 'Egg', quantity: '1'},
            {item: 'Sugar', quantity: '2 tbsp'},
            {item: 'Butter', quantity: '1 tbsp melted'},
            {item: 'Baking powder', quantity: '1 tsp'},
            {item: 'Salt', quantity: 'a pinch'},
            {item: 'Maple syrup', quantity: 'for serving'}
        ],
        steps: [
            'Mix dry ingredients.',
            'Add milk and egg.',
            'Whisk to combine.',
            'Add melted butter.',
            'Heat pan and grease lightly.',
            'Pour batter in rounds.',
            'Flip when bubbles appear.',
            'Cook until golden.',
            'Stack on a plate.',
            'Serve with maple syrup.',
        ],
        tags: ["Breakfast", "Dessert"]
    }
];

const seedData = async () => {
    try {
        await connectDB();
        await Recipe.deleteMany(); // Clear existing recipes
        await Recipe.insertMany(items);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
