CREATE DATABASE recipesdb;

DROP DATABASE recipesdb;

USE recipesdb;

DROP TABLE `categories`;

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

USE recipesdb; 

DROP TABLE `recipes`;

CREATE TABLE IF NOT EXISTS `recipes`(
`recipe_id` INT(11) auto_increment,
`name` varchar(255) NOT NULL,
`description` longtext NOT NULL,
`category_id` int(11) NOT NULL,
`instruction_one` longtext NOT NULL,
`instruction_two` longtext NOT NULL,
`instruction_three` longtext NOT NULL,
`instruction_four` longtext NOT NULL,
`instruction_five` longtext NOT NULL,
`instruction_six` longtext NOT NULL,
`difficulty_id` int(11) NOT NULL,
`healthy` ENUM('no', 'yes') NOT NULL DEFAULT 'no',
`prep_time` varchar(32) NOT NULL,
`vegetarian` ENUM('no', 'yes') NOT NULL DEFAULT 'no',
`image_id` INT(11) NOT NULL,
PRIMARY KEY (`recipe_id`),
FOREIGN KEY (category_id) REFERENCES categories(category_id),
FOREIGN KEY (difficulty_id) REFERENCES difficulties(difficulty_id),
FOREIGN KEY (image_id) REFERENCES recipeimages(image_id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

ALTER TABLE `recipes`  AUTO_INCREMENT = 1;

INSERT INTO `recipes` (`recipe_id`, `name`, `description`, `category_id`, `instruction_one`, `instruction_two`, `instruction_three`, `instruction_four`, `instruction_five`, `instruction_six`, `difficulty_id`, `healthy`, `prep_time`, `vegetarian`, `image_id`) VALUES
(1, 'Rustic Vegetable Chickpea Soup', 'This vegetarian soup is packed with vegetables and lentils - its healthy, low fat and full of flavour. To bulk it up, why not add borlotti beans or chicken',  7, 'Heat 2 tbsp olive oil in a large saucepan, then gently cook 2 finely chopped onions for 5 mins, until soft but not coloured. Add 1kg peeled, deseeded and chopped pumpkin or squash to the pan, then carry on cooking for 8-10 mins, stirring occasionally until it starts to soften and turn golden.', 'Pour 700ml vegetable stock into the pan, then season with salt and pepper. Bring to the boil, then simmer for 10 mins until the squash is very soft. Pour the 142ml pot of double cream into the pan, bring back to the boil, then purée with a hand blender. For an extra-velvety consistency you can now push the soup through a fine sieve into another pan. The soup can now be frozen for up to 2 months.', 'While the soup is cooking, slice the crusts from 4 slices of wholemeal seed bread, then cut the bread into small croutons. Heat the remaining 2 tbsp olive oil in a frying pan, then fry the bread until it starts to become crisp. Add a handful of pumpkin seeds to the pan, then cook for a few mins more until they are toasted. These can be made a day ahead and stored in an airtight container. Reheat the soup if needed, taste for seasoning, then serve scattered with croutons and seeds and drizzled with more olive oil, if you want.', '', '', '', 2, 'yes', '30 mins', 'Yes', 1),
(2, 'Beetroot & onion seed soup', 'A deep red autumnal soup thats low fat, vegetarian and full of flavour. Beetroot and apple give this soup a subtle sweet flavour, while lentils add protein and bulk', 6, 'Tip the beetroot, lentils, apple, garlic and onion seeds into a blender with the vegetable stock and some seasoning, and blitz until smooth. Heat until piping hot in the microwave or on the hob, then scatter over some extra onion seeds, if you like.', '', '', '', '', '', 2, 'yes', '10 mins', 'Yes',2),
(3, 'Sweet potato & lentil soup', 'Satisfying and simple to make, homemade soup is a great supper or take-to-work lunch', 6, 'Put the curry powder into a large saucepan, then toast over a medium heat for 2 mins. Add the olive oil, stirring as the spice sizzles in the pan. Tip in the onions, apple, garlic, coriander stalks and ginger, season, then gently cook for 5 mins, stirring every so often.', 'Meanwhile, peel, then grate the sweet potatoes. Tip into the pan with the stock, lentils, milk and seasoning, then simmer, covered, for 20 mins. Blend until smooth using a stick blender. Stir in the lime juice, check the seasoning and serve, topped with roughly-chopped coriander leaves.', '', '', '', '', 2, 'yes', '45 mins', 'Yes', 3),
(4, 'Pumpkin soup', 'Whip up this easy pumpkin soup as a starter for a dinner party or a light supper when you need a bit of comfort – it has a lovely silky texture', 6, 'Heat 2 tbsp olive oil in a large saucepan, then gently cook 2 finely chopped onions for 5 mins, until soft but not coloured. ', 'Add 1kg peeled, deseeded and chopped pumpkin or squash to the pan, then carry on cooking for 8-10 mins, stirring occasionally until it starts to soften and turn golden.', 'Pour 700ml vegetable stock into the pan, then season with salt and pepper. Bring to the boil, then simmer for 10 mins until the squash is very soft.', 'Pour the 142ml pot of double cream into the pan, bring back to the boil, then purée with a hand blender. For an extra-velvety consistency you can now push the soup through a fine sieve into another pan. The soup can now be frozen for up to 2 months.', 'While the soup is cooking, slice the crusts from 4 slices of wholemeal seed bread, then cut the bread into small croutons. Heat the remaining 2 tbsp olive oil in a frying pan, then fry the bread until it starts to become crisp. Add a handful of pumpkin seeds to the pan, then cook for a few mins more until they are toasted. These can be made a day ahead and stored in an airtight container.', 'Reheat the soup if needed, taste for seasoning, then serve scattered with croutons and seeds and drizzled with more olive oil, if you want.', 2, 'yes', '45mins', 'Yes', 4),
(5, 'Sweet potato & coconut curry', 'Prep your veggies and let the slow cooker do the work with our filling sweet potato curry', 2, 'Heat 1 tbsp olive oil in a large non-stick frying pan and add the onion. Fry gently for 10 mins until soft then add the garlic and grate the ginger straight into the pan. Stir in the paprika and the cayenne and cook for another minute then tip into the slow cooker.', 'Return the pan to the heat and add another 1 tbsp oil along with the chilli, red pepper and shredded cabbage. Cook for 4-5 mins then tip into the slow cooker.', 'Use the remaining oil to fry the sweet potatoes, you may have to do this in 2 or 3 batches depending on the size of your pan. Cook the sweet potatoes for around 5 mins or just until they start to pick up some colour at the edges then put them in the slow cooker too.', 'Pour the passata and the coconut milk over the sweet potatoes, stir to mix everything together and cover the slow cooker with a lid and cook for 6-8hrs or until the sweet potatoes are tender.', 'Stir the peanut butter through the curry, season well with salt and pepper and serve with couscous and chopped coriander scattered over the top.', '', 2, 'yes', '30 mins', 'Yes', 5);

select * from recipes;

DROP TABLE `recipeimages`;

/* Creates Recipe Image Table */
CREATE TABLE IF NOT EXISTS `recipeimages`(
`image_id` INT(11) auto_increment,
`image_name_path` varchar(255) NOT NULL ,
PRIMARY KEY (`image_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

ALTER  TABLE `recipeimages` 
   ADD Column CreatedOn timestamp NOT NULL DEFAULT current_timestamp ;

ALTER TABLE `recipeimages`  AUTO_INCREMENT = 1;

INSERT INTO `recipeimages` (`image_id`, `image_name_path`) VALUES
(1, './assets/images/rustic-vegetable-soup.jpg'),
(2, './assets/images/beetroot-onion-seed-soup.jpg'),
(3, './assets/images/sweet-potato-lentil-soup.jpg'),
(4, './assets/images/pumpkin-soup.jpg'),
(5, './assets/images/sweet-potato-coconut-curry.jpg');

INSERT INTO `recipeimages` (`image_id`, `image_name_path`) VALUES
(6, './assets/images/noimage.png');


SELECT * FROM `recipeimages`;

INSERT INTO `recipeimages` (`image_name_path`) VALUES
('balls3.jpg');

SELECT `image_id` FROM `recipeimages` ORDER BY `image_id` DESC LIMIT 1;


CREATE TABLE IF NOT EXISTS `difficulties` (
	`difficulty_id` INT(11) auto_increment,
    `difficulty_descr` varchar(255) NOT NULL,
    primary key (`difficulty_id`) 
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

INSERT INTO `difficulties` (`difficulty_id`, `difficulty_descr`) VALUES
(1, 'Easy'),
(2, 'Medium'),
(3, 'Hard');

DROP TABLE `difficulties`;

SELECT * from `difficulties`;

/*
INSERT INTO `recipeimages` (`image_id`, `image_name_path`) VALUES
(1, 'rustic_vegetable_soup.jpg'),
(2, 'beetroot_onion_seed_soup.jpg'),
(3, 'sweet_potato_lentil_soup.jpg'),
(4, 'pumpkin_soup.jpg'),
(5, 'sweet_potato_coconut_curry.jpg');
*/
/*
INSERT INTO `recipeimages` (`image_id`, `image_name_path`) VALUES
(1, 'rustic_vegetable_soup.jpg'),
(2, 'beetroot_onion_seed_soup.jpg'),
(3, 'sweet_potato_lentil_soup.jpg'),
(4, 'pumpkin_soup.jpg'),
(5, 'sweet_potato_coconut_curry.jpg');
*/

/* Change column recipe_id in table recipes to be auto increment */
/*ALTER TABLE `recipes` MODIFY COLUMN `recipe_id` INT(11) auto_increment;*/
/*ALTER TABLE `recipes` MODIFY COLUMN `prep_time` INT(11);*/

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

ALTER TABLE `recipeingredients` MODIFY COLUMN `recipe_ingredient_id` INT auto_increment;
ALTER TABLE `recipeingredients` MODIFY COLUMN `comments` varchar(255);

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
(30, 3, 20, '1.2l', ''),
(31, 3, 13, '100g', ''),
(32, 3, 40, '300ml', ''),
(33, 3, 41, '1', ''),
(34, 4, 19, '4 tbsp', ''),
(35, 4, 8, '2 finely chopped', ''),
(36, 4, 31, '1kg pumpkin peeled, deseeded and chopped into chunks', ''),
(37, 4, 20, '700ml', ''),
(38, 4, 33, '142ml', ''),
(39, 4, 34, '4 slices', ''),
(40, 4, 32, 'handful', ''),
(41, 5, 17, '4 tbsp', ''),
(42, 5, 8, '2', 'halved and sliced'),
(43, 5, 5, '3 garlic cloves', 'crushed'),
(44, 5, 39, 'thumb sized', 'peeled'),
(45, 5, 3, '1 tsp', ''),
(46, 5, 42, '½ tsp', ''),
(47, 5, 43, '2', 'deseeded and sliced'),
(48, 5, 44, '2', 'deseeded and sliced'),
(49, 5, 45, '250g', 'shredded'),
(50, 5, 10, '1kg', 'peeled and chopped into chunks'),
(51, 5, 46, '300g', ''),
(52, 5, 47, '400ml', ''),
(53, 5, 48, '2 tbsp', '');


SELECT * from recipeingredients;

DROP TABLE `ingredients`;

CREATE TABLE IF NOT EXISTS `ingredients` (
`ingredient_id` INT(11) NOT NULL,
`name` varchar(256),
`description` varchar(255),
`checked` bool,
PRIMARY KEY (`ingredient_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

ALTER TABLE `ingredients`
DROP COLUMN `description`;

TRUNCATE TABLE `ingredients`;

DROP TABLE `ingredients`;

INSERT INTO `ingredients` (`ingredient_id`, `name`, `checked`) VALUES
(1, 'Tumeric', false),
(2, 'Cumin', false),
(3, 'Paprika', false),
(4, 'Thyme', false),
(5, 'Garlic', false),
(6, 'Salt', false),
(7, 'Pepper', false),
(8, 'Onion', false),
(9, 'Chilli powder', false),
(10, 'Sweet Potato', false),
(11, 'Broccoli', false),
(12, 'Courgette', false),
(13, 'Lentils', false),
(14, 'Tomato', false),
(15, 'Kidney beans', false),
(16, 'Salmon', false),
(17, 'Butter beans', false),
(19, 'Olive oil', false),
(20, 'Vegatable stock', false),
(21, 'Carrots', false),
(22, 'Chick peas', false),
(23, 'Celery', false),
(24, 'Tomato paste', false),
(25, 'Water', false),
(26, 'Pasta', false),
(27, 'Beetroot', false),
(28, 'Apple', false),
(29, 'Butter', false),
(30, 'Onion seeds', false),
(31, 'Pumpkin', false),
(32, 'Pumpkin seeds', false),
(33, 'Cream', false),
(34, 'Wholemeal seeded bread', false),
(35, 'Oregano', false),
(36, 'Parsley', false),
(37, 'Curry powder', false),
(38, 'Coriander', false),
(39, 'Ginger', false),
(40, 'Milk', false),
(41, 'Lime', false),
(42, 'Cayenne', false),
(43, 'Red chillies', false),
(44, 'Red peppers', false),
(45, 'Red cabbage', false),
(46, 'Passata', false),
(47, 'Coconut milk', false),
(48, 'Peanut butter', false),
(49, 'Lemon grass', false),
(50, 'Spring onions', false),
(51, 'Basil', false),
(52, 'Tamari', false),
(53, 'Aubergine', false),
(54, 'Coconut oil', false),
(55, 'Green beans', false),
(56, 'Sesame oil', false),
(57, 'Buck wheat', false),
(58, 'Cashew nuts', false),
(59, 'Desiccated coconut', false),
(60, 'Kaffir lime leaves', false),
(61, 'Green chillies', false);

SELECT * FROM `ingredients`;

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

USE recipesdb;
/*Lists all the ingredients in a particular recipe*/
SELECT recipes.name as Recipe_Name, ingredients.name as Ingredient, recipeingredients.quantity as Quantity, 
recipeingredients.comments as Comments, instruction_one as Step_1,  instruction_two as Step_2, instruction_three as Step_3
FROM ((recipeingredients 
JOIN recipes ON recipeingredients.recipe_id=recipes.recipe_id)
JOIN ingredients ON recipeingredients.ingredient_id=ingredients.ingredient_id)
WHERE recipes.recipe_id = 1;


SELECT recipeingredients.recipe_id as Recipe_id, ingredients.name as Ingredient, recipeingredients.quantity as Quantity, recipeingredients.comments as Comments
            FROM ((recipeingredients
            JOIN recipes ON recipeingredients.recipe_id=recipes.recipe_id)
            JOIN ingredients ON recipeingredients.ingredient_id=ingredients.ingredient_id)
            WHERE recipeingredients.recipe_id = 2;

UPDATE recipeingredients
                SET
                    quantity = '69',
                    comments = 'cawabunga'
                WHERE
                    recipe_id = 1
                AND 
                    ingredient_id = 17; 
                    
/* Selects recipes and JOINS category name from Category table and JOINS recipe image from the Image table*/                    
SELECT r.recipe_id, r.name as recipe_name, c.name as category, r.prep_time, r.vegetarian, i.image_name_path as image_path
FROM ((recipes r
JOIN categories c ON r.category_id=c.category_id)
JOIN recipeimages i ON r.image_id=i.image_id)
LIMIT 0,5;

USE recipesdb;

SELECT r.recipe_id, r.name as recipe_name, c.name as category, r.prep_time, r.vegetarian, r.difficulty, r.healthy,
            i.image_name_path as image_path, r.description as recipe_description
            FROM ((recipes r
            JOIN categories c ON r.category_id=c.category_id)
            JOIN recipeimages i ON r.image_id=i.image_id)
            LIMIT 0, 5;
            
SELECT r.name as Recipe_Name, r.instruction_one as Step_1,  r.instruction_two as Step_2, r.instruction_three as Step_3,
            r.instruction_four as Step_4, r.instruction_five as Step_5, r.instruction_six as Step_6, r.prep_time as prep_time,
            r.vegetarian as Vegetarian, r.difficulty as difficulty, r.healthy as healthy,
            ri.image_name_path as image_name_path, r.description as recipe_description
            FROM recipes r JOIN recipeimages ri
            ON r.image_id=ri.image_id
            WHERE r.recipe_id = 1;
            
            
SELECT r.name as Recipe_Name, r.instruction_one as instruction_one, r.instruction_two as instruction_two, r.instruction_three as instruction_three,
            r.instruction_four as instruction_four, r.instruction_five as instruction_five, r.instruction_six as instruction_six, r.prep_time as prep_time,
            r.vegetarian as vegetarian, d.difficulty_descr as difficulty, r.healthy as healthy,
            ri.image_name_path as image_name_path, r.description as recipe_description, c.name as category_name
            FROM (((recipes r 
            JOIN categories c ON r.category_id=c.category_id)
            JOIN recipeimages ri ON r.image_id=ri.image_id)
            JOIN difficulties d ON r.difficulty_id=d.difficulty_id)
            WHERE r.recipe_id = 2