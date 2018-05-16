CREATE DATABASE recipesdb;

USE recipesdb;

CREATE TABLE IF NOT EXISTS `categories` (
`category_id` int(11) NOT NULL,
`name` varchar(256) NOT NULL,
`description` text NOT NULL,
PRIMARY KEY (`category_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

ALTER TABLE `categories`
DROP COLUMN `description`;

INSERT INTO `categories` (`category_id`, `name`) VALUES 
(1, 'Starter'),
(2, 'Curry'),
(3, 'Pasta'),
(4, 'Meat'),
(5, 'Fish'),
(6, 'Soup'),
(7, 'Broth'),
(8, 'Desert');

SELECT * FROM categories;

CREATE TABLE IF NOT EXISTS `ingredients` (
`ingredient_id` INT(11) NOT NULL,
`name` varchar(256),
`description` varchar(255),
PRIMARY KEY (`ingredient_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

ALTER TABLE `ingredients`
DROP COLUMN `description`;

TRUNCATE TABLE `ingredients`;

INSERT INTO `ingredients` (`ingredient_id`, `name`) VALUES
(1, 'Tumeric'),
(2, 'Cumin'),
(3, 'Paprika'),
(4, 'Thyme'),
(5, 'Garlic'),
(6, 'Salt'),
(7, 'Pepper'),
(8, 'Onion'),
(9, 'Chilli powder'),
(10, 'Sweet Potato'),
(11, 'Broccoli'),
(12, 'Courgette'),
(13, 'Lentils'),
(14, 'Tomato'),
(15, 'Kidney beans'),
(16, 'Salmon'),
(17, 'Olive oil'),
(18, 'Vegatable stock'),
(19, 'Olive oil'),
(20, 'Vegatable stock'),
(21, 'Carrots'),
(22, 'Chick peas'),
(23, 'Celery'),
(24, 'Tomato paste'),
(25, 'Water'),
(26, 'Pasta'),
(27, 'Beetroot'),
(28, 'Apple'),
(29, 'Butter'),
(30, 'Onion seeds'),
(31, 'Pumpkin'),
(32, 'Pumpkin seeds'),
(33, 'Cream'),
(34, 'Wholemeal seeded bread'),
(35, 'Oregano'),
(36, 'Parsley'),
(37, 'Curry powder'),
(38, 'Coriander'),
(39, 'Ginger'),
(40, 'Milk'),
(41, 'Lime');

SELECT * FROM `ingredients`;

DROP TABLE `recipes`;

CREATE TABLE IF NOT EXISTS `recipes`(
`recipe_id` INT(11) auto_increment,
`names` varchar(255) NOT NULL,
`category_id` int(11) NOT NULL,
`instruction_one` longtext NOT NULL,
`instruction_two` longtext NOT NULL,
`instruction_three` longtext NOT NULL,
`instruction_four` longtext NOT NULL,
`prep_time` varchar(32) NOT NULL,
`vegetarian` ENUM('no', 'yes') NOT NULL DEFAULT 'no',
PRIMARY KEY (`recipe_id`),
FOREIGN KEY (category_id) REFERENCES categories(category_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

INSERT INTO `recipes` (`recipe_id`, `names`, `category_id`, `instruction_one`, `instruction_two`, `instruction_three`, `instruction_four`, `prep_time`, `vegetarian`) VALUES
(1, 'Rustic Vegetable Chickpea Soup', 7, 'Heat 2 tbsp olive oil in a large saucepan, then gently cook 2 finely chopped onions for 5 mins, until soft but not coloured. Add 1kg peeled, deseeded and chopped pumpkin or squash to the pan, then carry on cooking for 8-10 mins, stirring occasionally until it starts to soften and turn golden.', 'Pour 700ml vegetable stock into the pan, then season with salt and pepper. Bring to the boil, then simmer for 10 mins until the squash is very soft. Pour the 142ml pot of double cream into the pan, bring back to the boil, then purée with a hand blender. For an extra-velvety consistency you can now push the soup through a fine sieve into another pan. The soup can now be frozen for up to 2 months.', 'While the soup is cooking, slice the crusts from 4 slices of wholemeal seed bread, then cut the bread into small croutons. Heat the remaining 2 tbsp olive oil in a frying pan, then fry the bread until it starts to become crisp. Add a handful of pumpkin seeds to the pan, then cook for a few mins more until they are toasted. These can be made a day ahead and stored in an airtight container. Reheat the soup if needed, taste for seasoning, then serve scattered with croutons and seeds and drizzled with more olive oil, if you want.', '', '30', 'Yes'),
(2, 'Beetroot & onion seed soup', 6, 'Tip the beetroot, lentils, apple, garlic and onion seeds into a blender with the vegetable stock and some seasoning, and blitz until smooth. Heat until piping hot in the microwave or on the hob, then scatter over some extra onion seeds, if you like.', '', '', '', '10', 'Yes'),
(3, 'Sweet potato & lentil soup', 6, 'Put the curry powder into a large saucepan, then toast over a medium heat for 2 mins. Add the olive oil, stirring as the spice sizzles in the pan. Tip in the onions, apple, garlic, coriander stalks and ginger, season, then gently cook for 5 mins, stirring every so often.', 'Meanwhile, peel, then grate the sweet potatoes. Tip into the pan with the stock, lentils, milk and seasoning, then simmer, covered, for 20 mins. Blend until smooth using a stick blender. Stir in the lime juice, check the seasoning and serve, topped with roughly-chopped coriander leaves.', '', '', '45', 'Yes'),
(4, 'Pumpkin soup', 6, 'Heat 2 tbsp olive oil in a large saucepan, then gently cook 2 finely chopped onions for 5 mins, until soft but not coloured. Add 1kg peeled, deseeded and chopped pumpkin or squash to the pan, then carry on cooking for 8-10 mins, stirring occasionally until it starts to soften and turn golden.', 'Pour 700ml vegetable stock into the pan, then season with salt and pepper. Bring to the boil, then simmer for 10 mins until the squash is very soft. Pour the 142ml pot of double cream into the pan, bring back to the boil, then purée with a hand blender. For an extra-velvety consistency you can now push the soup through a fine sieve into another pan. The soup can now be frozen for up to 2 months.', 'While the soup is cooking, slice the crusts from 4 slices of wholemeal seed bread, then cut the bread into small croutons. Heat the remaining 2 tbsp olive oil in a frying pan, then fry the bread until it starts to become crisp. Add a handful of pumpkin seeds to the pan, then cook for a few mins more until they are toasted. These can be made a day ahead and stored in an airtight container. Reheat the soup if needed, taste for seasoning, then serve scattered with croutons and seeds and drizzled with more olive oil, if you want.', '', '45', 'Yes');

SELECT * FROM `recipes`;

/* Change column recipe_id in table recipes to be auto increment */
ALTER TABLE `recipes` MODIFY COLUMN `recipe_id` INT(11) auto_increment;
ALTER TABLE `recipes` MODIFY COLUMN `prep_time` INT(11);

/* Delete record from recipes table with id = 19 */
delete from recipesdb.recipes WHERE recipe_id = 19;

DROP TABLE `recipeingredients`;

CREATE TABLE IF NOT EXISTS `recipeingredients` (
`recipe_ingredient_id` INT(11) NOT NULL,
`recipe_id` INT(11) NOT NULL,
`ingredient_id` INT(11) NOT NULL,
`quantity` varchar(255) NOT NULL,
`comments` varchar(255),
 PRIMARY KEY (`recipe_ingredient_id`),
 FOREIGN KEY (`recipe_id`) REFERENCES recipe(`recipe_id`),
 FOREIGN KEY (`ingredient_id`) REFERENCES ingredient(`ingredient_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

INSERT INTO `recipeingredients` (`recipe_ingredient_id`, `recipe_id`, `ingredient_id`, `quantity`, `comments`) VALUES
(1, 1, 17, '2 tbsp', ''),
(2, 1, 8, '1', 'finely chopped'),
(3, 1, 23, '1', 'diced'),
(4, 1, 21, '1', 'peeled and diced'),
(5, 1, 5, '2', 'minced'),
(6, 1, 24, '2 tbsp', ''),
(7, 1, 14, '1 1/2 cups', ''),
(8, 1, 20, '1 quart/litre', ''),
(9, 1, 35, '1/2 tsp', 'fresh, minced'),
(10, 1, 26, '1 cup', ''),
(11, 1, 22, '3 cans', ''),
(12, 1, 6, '1/2 tsp', ''),
(13, 1, 7, '1/8 tsp', ''),
(14, 1, 9, '1/2 tsp', ''),
(15, 1, 36, '1/4 cup', ''),
(16, 2, 27, '250g cooked', ''),
(17, 2, 13, '100g canned', ''),
(18, 2, 28, '1 small', ''),
(19, 2, 5, '1 crushed clove', ''),
(20, 2, 30, '1 tsp', ''),
(21, 2, 28, '250ml ', ''),
(22, 3, 37, '2 tsp', ''),
(23, 3, 17, '3 tbsp', ''),
(24, 3, 8, '2', ''),
(25, 3, 28, '1', ''),
(26, 3, 5, '3 cloves', ''),
(27, 3, 38, '20g pack coriander, stalks chopped', ''),
(28, 3, 39, 'thumb-size piece fresh root ginger grated', ''),
(29, 3, 10, '800g', ''),
(30, 3, 18, '1.2l', ''),
(31, 3, 13, '100g', ''),
(32, 3, 40, '300ml', ''),
(33, 3, 41, '1', ''),
(34, 4, 19, '4 tbsp', ''),
(35, 4, 8, '2 finely chopped', ''),
(36, 4, 31, '1kg pumpkin peeled, deseeded and chopped into chunks', ''),
(37, 4, 20, '700ml', ''),
(38, 4, 33, '142ml', ''),
(39, 4, 34, '4 slices', ''),
(40, 4, 32, 'handful', '');

SELECT * from recipeingredients;

/*Lists the different recipes and the cooking steps*/
SELECT recipes.name as Recipe_Name, categories.name as Category, recipes.instruction_one as step1, recipes.instruction_one as step2, recipes.instruction_one as step3, recipe.instruction_one as step4 
FROM recipe s
LEFT JOIN categories ON recipes.category_id=categories.category_id
ORDER BY recipes.recipe_id DESC;

/*Lists all the ingredients in a particular recipe*/
SELECT recipes.name as Recipe_Name, ingredients.name as Ingredient_Name, recipeingredients.quantity as Ingredient_Quantity, recipeingredients.comments as Comments
FROM ((recipeingredients
JOIN recipes ON recipeingredients.recipe_id=recipes.recipe_id)
JOIN ingredients ON recipeingredients.ingredient_id=ingredients.ingredient_id)
WHERE recipes.name='Rustic Vegetable Chickpea Soup';

/*Lists all the ingredients in a particular recipe*/
SELECT recipes.name as Recipe_Name, ingredients.name as Ingredient, recipeingredients.quantity as Quantity, 
recipeingredients.comments as Comments, instruction_one as Step_1,  instruction_two as Step_2, instruction_three as Step_3
FROM ((recipeingredients 
JOIN recipes ON recipeingredients.recipe_id=recipes.recipe_id)
JOIN ingredients ON recipeingredients.ingredient_id=ingredients.ingredient_id)
WHERE recipes.recipe_id = 1;
