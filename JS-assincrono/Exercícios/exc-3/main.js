var listElement = document.querySelector('#app');
var inputElement = document.querySelector('input');
function newUser(user) { 
    var user = inputElement.value;
    if (user) {  
        axios.interceptors.request.use((config) => {
            var todoElement = document.createElement('ul');
            var linkElement = document.createElement('li');
            var todoText = document.createTextNode('Loading...');
            linkElement.appendChild(todoText);
            listElement.appendChild(todoElement);
            todoElement.appendChild(linkElement);
            
            return config;
        }, (error) => {
    
        console.log(error);
        return Promise.reject(error);
        });
    
        axios.interceptors.response.use((response) => {
            var todoElement = document.querySelector('ul');
            var linkElement = document.querySelector('li');
            listElement.removeChild(todoElement);
            todoElement.removeChild(linkElement);
            
            return response;   
        }, (error) => {
        return Promise.reject(error);
        });  
        
        axios.get('https://api.github.com/users/' + user + '/repos')
            .then(function(response) {
                var todoElement = document.createElement('ul');
                
                for (repos of response.data) {
                    var todoText = document.createTextNode(repos.name);                        
                    var linkElement = document.createElement('li');                
                                                
                    linkElement.appendChild(todoText);
                    todoElement.appendChild(linkElement);
                    listElement.appendChild(todoElement);
                }
            })
            .catch(function(error) {
                error = 'Usuário não existe';
                alert(error);
            }
        );
    }
}