var plusButton = document.querySelector('#plus_button');
var input = document.querySelector('input');
var inputContainer = document.querySelector('.input_container');
var list = document.querySelector('.list');

// Input Slide
plusButton.addEventListener('click', function () {
  plusButton.style.pointerEvents = "none";
  if(input.style.display === 'block') {
    input.style.zIndex = "-1";
    setTimeout(function () {
      inputContainer.classList.remove('input_container_height');
      input.classList.remove('open');
    }, 200);
    setTimeout(function () {
      input.style.display = 'none';
      plusButton.style.pointerEvents = "all";
    }, 700);
  } else {
    input.style.display = 'block';
    setTimeout(function () {
      input.classList.add('open');
      inputContainer.classList.add('input_container_height');
    }, 10);
    setTimeout(function () {
      input.style.zIndex = "0";
      plusButton.style.pointerEvents = "all";
      input.focus();
    }, 500);
  }
});

// Get Todos Data
var url = 'http://localhost:3000/api/todos/';
axios.get(url)
  .then(addTodos)
  .catch(function (err) {
    console.log(err);
  });

var trashIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><title>Delete</title><path d='M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320' style='fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='80' y1='112' x2='432' y2='112' style='stroke:#ffffff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><path d='M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40' style='fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='176' x2='256' y2='400' style='fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='184' y1='176' x2='192' y2='400' style='fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='328' y1='176' x2='320' y2='400' style='fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg>";

// Read and add Input text
input.addEventListener('keyup', function (event) {
  if(event.which === 13 && input.value !== '') {
    axios({
      method: 'post',
      url: url,
      data: {
        name: input.value,
      }
    }).then(function (data) {
      input.value = '';
      addTodo(data.data);
    }).catch(function (err) {
      console.log(err);
    });
  }
});

// Click listener for list
list.addEventListener('click', function (event) {
  var clicked = event.target;
  if(clicked.className === 'delete_button') {
    deleteItem(clicked);
  }
  if(clicked.className.indexOf('list_item') !== -1) {
    updateCompleted(clicked);
  }
});

// Delete Clicked
function deleteItem(clicked) {
  var deleteUrl = url + clicked.parentElement.id;
  axios({
    method: 'delete',
    url: deleteUrl,
  }).then(function (data) {
    clicked.parentElement.classList.add('done');
    setTimeout(function () {
      clicked.parentElement.remove();
    }, 200);
  }).catch(function (err) {
    console.log(err);
  });
}
// Update Clicked
function updateCompleted(clicked) {
  var completedUrl = url + clicked.id;
  clicked.classList.toggle('completed');
  var completed = true;
  if(clicked.className.indexOf('completed') === -1) {
    completed = false;
  } else {
    completed = true;
  }
  axios({
    method: 'put',
    url: completedUrl,
    data: {
      completed: completed,
    }
  }).then(function (data) {
    if(completed) {
      clicked.classList.add('done');
    } else {
      clicked.classList.remove('done');
    }
  }).catch(function (err) {
    console.log(err);
  });
}

// Add existing Todos
function addTodos(data) {
  var todos = data.data;
  for(var i = 0; i < todos.length; i++) {
    addTodo(todos[i]);
  }
}

// Add Todo to list
function addTodo(todo) {
  var li = document.createElement('li');
  var span = document.createElement('span');
  var p = document.createElement('p');
  span.classList.add('delete_button');
  span.innerHTML = trashIcon;
  p.innerHTML += todo.name;
  if(todo.completed) {
    li.classList.add('done');
    li.classList.add('completed');
  } else {
    li.classList.remove('done');
    li.classList.remove('completed');
  }
  li.appendChild(span);
  li.appendChild(p);
  li.classList.add('list_item');
  li.id = todo._id;
  list.appendChild(li);
}
