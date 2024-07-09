# Project: Check It
'Check It' is a task management web application with real time data update that helps user to easily manage upcoming and previous tasks. Users just need to create a task and he/she will be alarmed for the task. We have to a lot of work daily. By using this tool we can boost our productivity and enhance multitasking performance. During this project, I've faced real data update related issue which I've solved with Socket Io and I faced some authentication complexity which I've later solved by thinking and correcting my code logics.

# Key Features of this project:
- Users can create a new task for a specific day and time or can create tasks without date and time. Can update, delete their tasks.
- Users can visit today page where he/she can observe and maintain his/her tasks of that day. Can visit all tasks page where user all tasks are showed and can maintain those tasks. On events page, users can maintain their tasks using calendar UI.
- If users misses a task to finish on time, or if the user has set a alarm to inform him/her about the upcoming task, he/she will get notifications in the notifications page.
- Profile updating functionality has been implemented. Users can update his/her profile on profile update page.
- Every client side route has been secured with firebase authentication and server side route has been secured with JWT.

# If you want to test it on your local machine
- At first, you have to clone the server-side project repo from here https://github.com/Shahriar-Samir/TODO-LIST-backend, so you have to open a terminal in the directory where you want to clone the project.
- Give the command "git clone 'your repo clone link" in the terminal.
- Then you have to clone the client-side repo of this project and just like before clone it in that directory where the client repo has been cloned.
- After finishing all repos clone to the project directory, then open the terminal.
- In your both client and server terminals write 'npm i' for installing dependencies.
- At last, give the command 'npm start' to the server side integrated terminal it will start a localhost server on port 5000. Then you have to give the command 'npm run dev' in the client side integrated terminal and go to the link 'http://localhost:5173', then you should see this web project running on your local machine.
