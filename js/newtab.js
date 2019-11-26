/* TODO:
        - display datetime when hovering over a todo ("added <datetime>")
        - notes area (toggle to show) with markdown support
*/
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
                this.todos = JSON.parse(todos);
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
        src: "bar.gif",
        caption: "The sky above the port was the color of television, tuned to a dead channel. \"It's not like I'm using\", Case heard someone say, as he shouldered his way through the crowd around the door of the Chat. \"It's like my body's developed this massive drug deficiency.\" It was a Sprawl voice and a Sprawl joke. The Chatsubo was a bar for professional expatriates; you could drink there for a week and never hear two words in Japanese."
    },
    {
        src: "noir3.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },
    {
        src: "noir4.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },
    {
        src: "noir5.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },
    {
        src: "apartment.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },
    {
        src: "squat_steam.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },
    {
        src: "pixelcity.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },
    {
        src: "saito.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },
    {
        src: "cyberpunk_city4.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },
    {
        src: "computerroom.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },
    {
        src: "woman.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },
    {
        src: "hacker.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },       
    {
        src: "tv.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    },
    {
        src: "sigg.gif",
        caption: 'Our oceans are overfished and polluted. We are wiping out marine species and poisoning ourselves; consuming toxic seafoods containing mercury, lead, cadmium, dioxins, PCBs, pesticides, microplastics, etc. Ocean acidification levels are alarmingly high, we have to go back 35 million years to find an equivalent level. Dead zones are growing. Every year we produce 300 million tons of plastic, and ever year, we dump eight tons in our oceans.'
    }
];

let current_background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
document.body.style.backgroundImage = `url('../backgrounds/${current_background.src}')`;

console.log("current background: " + current_background.src);

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
    child.onmouseover = () => { console.log(todo.date.toString() ) };

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

    if (bVisible) {
        setTimeout(() => el.classList.toggle("show"), 40000);
        bVisible = false;
    }
}