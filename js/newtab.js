// TODO: notes area (toggle to show)
window.addEventListener('keyup', (event) => {
    const keyName = event.key;

    if (keyName === 'Enter') {
        document.getElementById("add_todo").focus();
        return;
    }

    if (keyName === 'Escape') {        
        document.getElementById("add_todo").blur();
        // TODO: remove text inputted on blur
    }
});

window.onload = function() {    
    document.hasFocus();    

    console.log("As you can see there are still bugs and quirks to work out, I would also like a few more features (multiple todo lists). Contributions are very welcome, https://github.com/erikbye/todotab")
}

const noop = () => {};

class TodoList {
    constructor(onReady, onAdd, onRefresh, onDelete) {
        this.onReady = onReady || noop;
        this.onAdd = onAdd || noop;
        this.onRefresh = onRefresh || noop;
        this.onDelete = onDelete || noop;
        this.todos = [];

        this.ready = browser.storage.sync.get('todos')
            .then(({ todos }) => {
                this.todos = (todos && JSON.parse(todos)) || [];
                this.onReady(this.todos);
            });
    }

    set() {
        return browser.storage.sync.set({ todos: JSON.stringify(this.todos) }).catch(console.log);
    }

    add(text) {
        const todo = {
            id: this.nextId(),
            text: text,
            done: false,
            date: new Date()
        };
        this.todos.unshift(todo);
        return this.set()
            .then(() => this.onAdd(todo));
    }

    done(id) {
        const todo = this.get(id);
        if (!todo)
            return;

        todo.done = !todo.done;
        return this.set()
            .then(() => this.onRefresh(todo));
    }

    update(id, props) {
        const todo = this.get(id);
        if (!todo)
            return;

        Object.assign(todo, props);
        return this.set()
            .then(() => this.onRefresh(todo));
    }

    get(id) {
        for (let todo of this.todos) {
            if (todo.id === id)
                return todo;
        }
        return null;
    }

    nextId() {
        let id = 1;
        while (this.get(id)) {
            id++;
        }
        return id;
    }

    delete(id) {
        const todo = this.get(id);
        if (!todo)
            return;

        this.todos = this.todos.filter(t => t.id !== todo.id);
        return this.set()
            .then(() => this.onDelete(todo));
    }
} // end class

const backgrounds = [   
    {
        src: "0.jpg",
        caption: "Though no one can go back and make a brand-new start, anyone can start from now and make a brand-new ending."
    },    
    {
        src: "1.jpg",
        caption: "Only put off until tomorrow what you are willing to die having left undone."
    },
    {
        src: "2.jpg",
        caption: "Whenever you find yourself on the side of the majority, it is time to pause and reflect."
    },
    {
        src: "3.jpg",
        caption: "Rarely have I seen a situation where doing less than the other guy is a good strategy."
    },
    {
        src: "4.jpg",
        caption: "If you genuinely want something, don't wait for it--teach yourself to be impatient."
    },
    {
        src: "5.jpg",
        caption: "Motivation is what gets you started. Habit [or passion/dedication/willpower] is what keeps you going."
    },
    {
        src: "6.jpg",
        caption: "If you don't design your own life plan, chances are you'll fall into someone else's plan. And guess what they have planned for you? Not much."
    },
    {
        src: "7.jpg",
        caption: "To be successful you must accept all challenges that come your way. You can't just accept the ones you like."
    },
    {
        src: "8.jpg",
        caption: "Many of life's failures are people who did not realize how close they were to success when they gave up."
    },
    {
        src: "9.jpg",
        caption: "The greater the artist, the greater the doubt. Perfect confidence is granted to the less talented as a consolation prize."
    },
    {
        src: "10.jpg",
        caption: "Successful and unsuccessful people do not vary greatly in their abilities. They vary in their desires to reach their potential."
    },
    {
        src: "11.jpg",
        caption: "Logic will get you from A to B. Imagination will take you everywhere."
    },
    {
        src: "12.jpg",
        caption: "Keep on going, and the chances are that you will stumble on something, perhaps when you are least expecting it. I never heard of anyone ever stumbling on something sitting down."
    },
    {
        src: "13.jpg",
        caption: "I cannot give you the formula for success, but I can give you the formula for failure--It is: Try to please everybody."
    },
    {
        src: "14.jpg",
        caption: "Failure should be our teacher, not our undertaker. Failure is delay, not defeat. It is a temporary detour, not a dead-end. Failure is something we can avoid only by saying nothing, doing nothing, and being nothing."
    },
    {
        src: "15.jpg",
        caption: "Success usually comes to those who are too busy to be looking for it."
    },
    {
        src: "16.jpg",
        caption: "It is better to fail in originality than to succeed in imitation."
    },
    {
        src: "17.jpg",
        caption: "All progress takes place outside the comfort zone."
    },
    {
        src: "18.jpg",
        caption: "Opportunities don't happen. You create them."
    },
    {
        src: "19.jpg",
        caption: "Success is walking from failure to failure with no loss of enthusiasm."
    },
    {
        src: "20.jpg",
        caption: "The ones who are crazy enough to think they can change the world, are the ones that do."
    },
    {
        src: "21.jpg",
        caption: "If you really look closely, most overnight successes took a long time."
    },
    {
        src: "22.jpg",
        caption: "The successful warrior is the average man, with laser-like focus."
    },
    {
        src: "23.jpg",
        caption: "Success is the sum of small efforts, repeated day-in and day-out."
    },
];

let hour = new Date().getHours(); // returns 0-23
let current_background = backgrounds[hour];

document.body.style.backgroundImage = `url('../backgrounds/${current_background.src}')`;

document.getElementById('add_todo').addEventListener('keyup', todo_input_handler);

function append_todos(todos, list) {
    for (let todo of todos.concat().sort((a, b) => a.date > b.date ? 1 : a.date < b.date ? - 1 : 0)) {
        append_todo_to_HTML_list(todo, list);
    }
}

function refresh_todo(id, element) {
    element = element || document.getElementById('todo-item-' + id);
    if (element.todo) {
        element.style.textDecoration = element.todo.done ? "line-through" : "none";
        element.children[0].innerText = element.todo.text;
    }
}

const todo_list_element = document.getElementById('todo-list');

const todo_list = new TodoList(
    todos => append_todos(todos, todo_list_element),
    todo => append_todo_to_HTML_list(todo, todo_list_element),
    todo => refresh_todo(todo.id),
    todo => delete_todo_from_DOM(todo.id, todo_list_element)
);

function todo_input_handler(e) {
    if (e.key == "Enter") {
        let value = e.target.value;
        e.target.value = '';
        e.preventDefault();

        todo_list.add(value);
    }
    return false;
}
const contextmenuitems = [];

function append_todo_to_HTML_list(todo, list) {
    let child = document.createElement('li');
    child.todo = todo;
    child.id = 'todo-item-' + todo.id;
    child.title = todo.date.toString();
 
    const span = document.createElement('span');
    span.innerText = todo.text;

    child.appendChild(span);

    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.text;
    input.style.display = 'none';
    child.appendChild(input);

    child.className = 'todo-item';

    child.oncontextmenu = function() {
        contextmenuitems.push(todo.id);
    }

    child.onclick = function(e) {
        if (e.ctrlKey) {
            const indexOf = contextmenuitems.indexOf(todo.id);
            if (indexOf > -1) {
                contextmenuitems.splice(indexOf, 1);
                child.style.backgroundColor = 'unset';
            } else {
                contextmenuitems.push(todo.id);
                child.style.backgroundColor = 'rgba(14, 54, 231, 0.507)';
            }
        } else {
            todo_list.done(todo.id);
        }
    };
    child.ondblclick = function() {
        input.style.display = 'block';
        span.style.display = 'none';
        input.focus();
    }

    input.onblur = function() {
        todo_list.update(todo.id, {
            text: input.value,
            done: false
        }).then(() => {
            input.style.display = 'none';
            span.style.display = 'block';
        });
    };

    input.onkeyup = function(e) {
        if (e.key === 'Enter' || e.key === 'Escape') {
            e.preventDefault();
            input.blur();
        }
    };

    if (list.children.length === 0) {
        list.appendChild(child);
    } else {
        list.insertBefore(child, list.children[0]);
    }

    refresh_todo(todo.id, child);
}

function delete_todo_from_DOM(todoId, list) {
    const element = document.getElementById('todo-item-' + todoId);
    if (element) {
        list.removeChild(element);
    }
}

function delete_todo() {
    while (contextmenuitems.length > 0) {
        const item = contextmenuitems.shift();
        if (item) todo_list.delete(item);
    }
}

function display_help_popup() {
    let bVisible = true;

    let el = document.getElementById("popup");
    el.classList.toggle("show");

    if (bVisible) {
        setTimeout(() => el.classList.toggle("show"), 5000);
        bVisible = false;
    }
}

function display_imageCaption_popup() {
    let bVisible = true;

    let el = document.getElementById("image-popup");
    el.classList.toggle("show");

    document.getElementById("image-popup").innerText = current_background.caption;

    if (bVisible) {
        setTimeout(() => el.classList.toggle("show"), 40000);
        bVisible = false;
    }
}

document
    .getElementById("image_caption")
    .addEventListener("click", display_imageCaption_popup);

document
    .getElementById("help_popup")
    .addEventListener("click", display_help_popup);

document
    .getElementById("darkModeToggle")
    .addEventListener("click", toggle_darkMode);

function toggle_darkMode() {
    console.log("toggle_darkMode()");

    let icon = document.querySelector('.fa.fa-sun-o');

    icon.classList.toggle('fa-moon-o');

    // var checkbox = document.getElementById("checkBox");

    // console.log(checkbox);
    // console.log(checkbox.checked);

    // browser.storage.sync.set({checkbox}).catch(console.log);

    // c.set({ todos: JSON.stringify(this.todos) }).catch(console.log);
}

for (const menu of document.getElementsByTagName("menu")) {
    for (const item of menu.childNodes) {
        item.addEventListener("click", delete_todo);
    }
}

(function init_datetime() {
    const element = document.getElementById('datetime');
    if (!element)
        return;

    const date = get_datetime();
    
    element.innerText = date.dayname + ' ' + date.day;

    const el = document.getElementById('dateyear');
    el.innerText = date.month + ' ' + date.fullyear;
})();

(function init_weeknumber() {
    const element = document.getElementById('weeknumber');
    if (!element)
        return;

    const week = new Date().getWeek();
    
    element.innerText = 'Week ' + week;
})();
