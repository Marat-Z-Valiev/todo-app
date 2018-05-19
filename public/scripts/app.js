const button = $('#add-item');
const input = $('#input');
const api = '/api/todos/';

$(function () {
  $.getJSON(api)
    .then(addTodos)
    .catch(err => {
      console.log(err);
    });

  function addTodos(todos) {
    todos.forEach(todo => {
      addTodo(todo);
    });
  }

  //Add todo item
  function addTodo(todo) {
    const newTodo = $(`<div class="item"><p>${todo.name}</p><span><img class="delete-icon" src="images/delete.svg"></span></div>`);
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    $('.todo-list').append(newTodo);
    if (todo.completed) {
      newTodo.addClass('completed');
    }
  }

  function createTodo() {
    let inputValue = input.val();
    if (inputValue != '') {
      $.post(api, {
        name: inputValue
      }).then((newTodo) => {
        input.val('');
        addTodo(newTodo);
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  //Add new checklist item by clicking on the button and pressing enter
  button.click(function () {
    createTodo();
  });

  //Add item on clicking the enter key
  input.keydown(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault;
      button.click();
    }
  });

  //Clear input on clicking the ESC key
  input.keydown(function (event) {
    if (event.keyCode === 27) {
      input.val('');
    }
  })

  //Delete an item by clicking on delete icon
  function removeTodo(todo) {
    const clickedId = todo.data('id');
    const deleteUrl = `${api}${clickedId}`;
    $.ajax({
      type: "DELETE",
      url: deleteUrl
    }).then(() => {
      todo.remove();
    }).catch((err) => {
      console.log(err);
    })
  }

  $('.todo-list').on('click', 'div', function () {
    updateTodo($(this));
  });

  //Update todo status
  function updateTodo(todo) {
    const updateUrl = `${api}${todo.data('id')}`;
    const isDone = !todo.data('completed');
    const updateData = {
      completed: isDone
    };
    $.ajax({
      type: 'PUT',
      url: updateUrl,
      data: updateData
    }).then((updatedTodo) => {
      todo.toggleClass('completed');
      todo.data('completed', isDone);
    })
  }

  $(document).on('click', '.delete-icon', function (event) {
    event.stopPropagation();
    removeTodo($(this).closest('div'));
  });

  //Add sort functionality using Jquery UI
  $(function () {
    $('.todo-list').sortable();
  });
});