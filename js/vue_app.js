// Vue
// TODO: extract these components to separate .vue component files
// .vue component files can contain html and css

var vm = new Vue({
    // options
})

var vue_dateTime = new Vue({
    el: '#datetime',
    data: {
        date: {}
    },
    mounted() {
        this.date = get_datetime();
    }
})

var vue_weekNumber = new Vue({
    el: '#weeknumber',
    data: {
        week: {}
    },
    mounted() {
        this.week = get_weeknumber();
    }
})


Vue.component('todo-item', {
    props: ['todo'],
    template: '<li> {{ todo.text }} </li>'
})

/*
var vue_todoList = new Vue({
    el: '#vue-todolist',
    data: {
        todoList: []
    },
    mounted() {
        todo_list.ready.then(() => {
            this.todoList = todo_list.todos
        });
    }
})
*/
