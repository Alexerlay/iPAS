document.addEventListener('DOMContentLoaded', function() {
    const recipeNameInput = document.getElementById('recipe-name');
    const recipeDescriptionInput = document.getElementById('recipe-description');
    const addBtn = document.getElementById('add-btn');
    const recipeList = document.getElementById('recipe-list');

    let recipes = [];

    // Sample recipes
    const sampleRecipes = [
        {
            name: 'Spaghetti Carbonara',
            description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
            favorite: false
        },
        {
            name: 'Chicken Stir-Fry',
            description: 'Quick and easy stir-fry with chicken, vegetables, and soy sauce.',
            favorite: false
        },
        {
            name: 'Chocolate Chip Cookies',
            description: 'Soft and chewy cookies loaded with chocolate chips.',
            favorite: false
        }
    ];

    // Load sample recipes
    sampleRecipes.forEach(recipe => {
        recipes.push(recipe);
    });
    displayRecipes();

    addBtn.addEventListener('click', function() {
        const name = recipeNameInput.value.trim();
        const description = recipeDescriptionInput.value.trim();

        if (name && description) {
            const recipe = { name, description, favorite: false };
            recipes.push(recipe);
            displayRecipes();
            recipeNameInput.value = '';
            recipeDescriptionInput.value = '';
        } else {
            alert('Please enter both name and description.');
        }
    });

    function displayRecipes() {
        recipeList.innerHTML = '';
        const sortedRecipes = recipes.sort((a, b) => b.favorite - a.favorite);
        sortedRecipes.forEach(recipe => displayRecipe(recipe));
    }

    function displayRecipe(recipe) {
        const li = document.createElement('li');
        li.className = 'recipe-item';

        const starBtn = document.createElement('button');
        starBtn.className = 'star-btn';
        starBtn.textContent = recipe.favorite ? '★' : '☆';
        if (recipe.favorite) starBtn.classList.add('favorited');
        starBtn.addEventListener('click', function() {
            recipe.favorite = !recipe.favorite;
            displayRecipes();
        });

        const contentDiv = document.createElement('div');
        contentDiv.className = 'recipe-content';

        const h3 = document.createElement('h3');
        h3.textContent = recipe.name;

        const p = document.createElement('p');
        p.textContent = recipe.description;

        contentDiv.appendChild(h3);
        contentDiv.appendChild(p);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            recipes = recipes.filter(r => r !== recipe);
            displayRecipes();
        });

        li.appendChild(starBtn);
        li.appendChild(contentDiv);
        li.appendChild(deleteBtn);

        recipeList.appendChild(li);
    }
});