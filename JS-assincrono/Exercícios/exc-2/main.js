var listElement = document.querySelector('#app');
var inputElement = document.querySelector('input');
function newUser(user) { 
    var user = inputElement.value;
        if (user) {    
            axios.get('https://api.github.com/users/' + user + '/repos')
                .then(function(response) {
                    var todoElement = document.createElement('ul');
                    for (repos of response.data) {

                        var todoText = document.createTextNode(repos.name);
                        
                        var linkElement = document.createElement('li');                
                                                
                        linkElement.appendChild(todoText);
                        todoElement.appendChild(linkElement);
                        
                        listElement.appendChild(todoElement);

                        console.log(response.data); // ex.: { user: 'Your User'}
                        console.log(response.status);

                    }
            })
                .catch(function(error) {
                    console.warn(error);
                });
        }
}






