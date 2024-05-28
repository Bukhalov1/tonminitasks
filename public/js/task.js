document.addEventListener('DOMContentLoaded', () => {
    const taskId = window.location.pathname.split('/').pop();
    const taskDetailsContainer = document.getElementById('task-details');

    fetch(`/api/task/${taskId}`)
        .then(response => response.json())
        .then(task => {
            const taskImage = document.createElement('img');
            taskImage.src = task.image;
            taskImage.alt = task.image ? task.title : "No image";
            taskImage.className = 'task-image';

            const taskTitle = document.createElement('h1');
            taskTitle.textContent = task.title;

            const taskDescription = document.createElement('p');
            taskDescription.textContent = task.description;

            const taskLink = document.createElement('a');
            taskLink.href = task.link;
            taskLink.textContent = 'Read more';
            taskLink.target = '_blank';

            const taskEndDate = document.createElement('p');
            taskEndDate.textContent = `End Date: ${task.endDate}`;

            const taskParticipants = document.createElement('p');
            taskParticipants.textContent = `Participants: ${task.participants}`;

            taskDetailsContainer.appendChild(taskImage);
            taskDetailsContainer.appendChild(taskTitle);
            taskDetailsContainer.appendChild(taskDescription);
            taskDetailsContainer.appendChild(taskLink);
            taskDetailsContainer.appendChild(taskEndDate);
            taskDetailsContainer.appendChild(taskParticipants);
        })
        .catch(error => {
            taskDetailsContainer.textContent = 'Task not found';
        });
});
