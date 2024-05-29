document.addEventListener('DOMContentLoaded', () => {
    const tasksContainer = document.getElementById('tasks');
    let currentPage = 1;
    let currentCategory = 'all';

    const loadTasks = (category, page) => {
        fetch(`/api/tasks?category=${category}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                data.tasks.forEach(task => {
                    const taskItem = document.createElement('div');
                    taskItem.className = 'task-item';

                    const taskImage = document.createElement('img');
                    taskImage.src = task.image;
                    taskImage.alt = task.image ? task.title : "No image";
                    taskImage.className = 'task-image';

                    const taskDetails = document.createElement('div');
                    taskDetails.className = 'task-details';

                    const taskTitle = document.createElement('h3');
                    taskTitle.textContent = task.title;

                    const taskDescription = document.createElement('p');
                    taskDescription.textContent = task.description;

                    const taskLink = document.createElement('a');
                    taskLink.href = task.link;
                    taskLink.textContent = 'Read more';
                    taskLink.target = '_blank';

                    taskDetails.appendChild(taskTitle);
                    taskDetails.appendChild(taskDescription);
                    taskDetails.appendChild(taskLink);

                    taskItem.appendChild(taskImage);
                    taskItem.appendChild(taskDetails);

                    taskItem.addEventListener('click', () => {
                        window.location.href = `/task/${task.id}`;
                    });

                    tasksContainer.appendChild(taskItem);
                });
            });
    };

    const handleCategoryChange = (category) => {
        tasksContainer.innerHTML = '';
        currentPage = 1;
        currentCategory = category;
        document.querySelectorAll('.slider-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(category).classList.add('active');
        loadTasks(currentCategory, currentPage);
    };

    document.querySelectorAll('.slider-button').forEach(button => {
        button.addEventListener('click', () => {
            handleCategoryChange(button.id);
        });
    });

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            currentPage++;
            loadTasks(currentCategory, currentPage);
        }
    });

    // Инициализация с загрузки начальной категории
    loadTasks(currentCategory, currentPage);
});

document.addEventListener('DOMContentLoaded', function() {
    let isAchievementsVisible = true;

    setInterval(() => {
        if (isAchievementsVisible) {
            document.getElementById('achievements-content').style.display = 'none';
            document.getElementById('updates-content').style.display = 'flex';
        } else {
            document.getElementById('achievements-content').style.display = 'flex';
            document.getElementById('updates-content').style.display = 'none';
        }
        isAchievementsVisible = !isAchievementsVisible;
    }, 5000);
});

