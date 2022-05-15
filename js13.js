function DataTable(config, data) {
    if (data == undefined){
        if (config.apiUrl){
            let link = config.apiUrl;
            let request = new XMLHttpRequest();
            request.open('GET', link);
            request.responseType = 'json';
            request.onload = () => {
                if (request.status < 400){
                    data = (request.response.data);
                    for (let i = 0; i < Object.values(data).length; i++){
                        Object.values(data)[i]['id'] = Object.keys(data)[i]
                        Object.values(data)[i]['birthday'] = Date().split(' ')[3] - Object.values(data)[i]['birthday'].split('-')[0]
                    }
                    console.log(data);
                    let createdDiv = document.createElement("div");
                    let createdTable = document.createElement("table");
                    let createdThead = document.createElement("thead");
                    let createdTbody = document.createElement("tbody");
                    let createdTdhead = document.createElement('tr');
                    let activities = document.createElement('th');
                    activities.innerHTML = 'Activities:';
                    data = Object.entries(data).map((element, index) => {
                        let createTrbody = document.createElement('tr');
                        let name = document.createElement('td');
                        createTrbody.id = element[1].id;
                        let surname = document.createElement('td');
                        let age = document.createElement('td');
                        let indexOfInfo = document.createElement('td');
                        let deleteEl = document.createElement('td');
                        deleteEl.innerHTML = `<button id='${element[1].id}'>Delete!</button>`;
                        name.innerHTML += element[1].name;
                        surname.innerHTML += element[1].surname;
                        age.innerHTML += element[1].birthday;
                        deleteEl.style.display = 'flex';
                        deleteEl.style.justifyContent = 'center';
                        deleteEl.id = 'delete-button'
                        indexOfInfo.innerHTML += index;
                        createTrbody.appendChild(indexOfInfo);
                        createTrbody.appendChild(name);
                        createTrbody.appendChild(surname);
                        createTrbody.appendChild(age);
                        createTrbody.appendChild(deleteEl)
                        deleteEl.querySelector('button').style.border = '4px solid lightblue';
                        deleteEl.querySelector('button').style.background = 'linear-gradient(45deg, lightblue, lightgray)';
                        deleteEl.querySelector('button').style.borderRadius = '7px';
                        deleteEl.style.transition = '1s all ease 0s'
                        deleteEl.addEventListener('mousemove', function(){
                            deleteEl.querySelector('button').style.background = 'gray';
                            deleteEl.querySelector('button').style.borderColor = 'darkgray';
                        })
                        deleteEl.addEventListener('click', function(event){
                            console.log(event.path[2].id)
                            console.log(request.response.data[event.path[2].id])
                            delete (request.response.data[event.path[2].id])
                            console.log((request.response.data))
                        })
                        deleteEl.addEventListener('mouseleave', function(){
                            deleteEl.querySelector('button').style.background = 'linear-gradient(45deg, lightblue, lightgray)';
                            deleteEl.querySelector('button').style.borderColor = 'lightblue';
                        })
                        return createdTbody.appendChild(createTrbody);
                    });
                    config.columns = Object.entries(config.columns).map((el, index) => {
                        if (index == 0){
                            let markNumber = document.createElement('th');
                            markNumber.innerHTML += '№';
                            createdTdhead.appendChild(markNumber);
                        }
                        let copyEl = el;
                        let createdTitle = document.createElement('th');
                        createdTitle.innerHTML += copyEl[1].title;
                        createdTdhead.appendChild(createdTitle);

                        if (index == config.columns.length - 1){
                            return createdTdhead;
                        } 
                    });
                    createdTdhead.appendChild(activities)
                    createdDiv.id = `${config.parent.slice(1,)}`;
                    createdDiv.appendChild(createdTable);
                    createdTable.appendChild(createdTbody);
                    createdTable.appendChild(createdThead);
                    createdThead.appendChild(createdTdhead);
                    document.body.appendChild(createdDiv);
                
                    createdDiv.style.border = '3px solid lightblue';
                    createdDiv.style.fontFamily = 'sans-serif';
                    createdDiv.style.maxWidth = '500px';
                    createdTable.style.width = '100%';
                    createdTbody.style.fontSize = '20px';
                    createdThead.style.fontSize = '20px';
                    document.querySelector('td').style.width = '100%';
                    document.querySelector('tr').style.width = '100%';
                    // themeClicker
                    let onoff = document.createElement('div');
                    let onoffCircle = document.createElement('div')
                    onoff.style.width = '100px';
                    onoff.style.height = '40px';
                    onoff.style.background = 'rgb(44, 138, 226)';
                    onoff.style.borderRadius = '25px';
                    onoff.style.border = '5px solid rgb(149, 201, 250)';
                    onoff.style.marginTop = '20px';
                    onoff.style.position = 'relative';
                    onoff.style.transition = '1s ease 0s';
                    onoffCircle.style.position = 'absolute';
                    onoffCircle.style.left = '2.5px';
                    onoffCircle.style.top = '2.5px';
                    onoffCircle.style.width = '35px';
                    onoffCircle.style.height = '35px';
                    onoffCircle.style.background = 'transparent';
                    onoffCircle.style.borderRadius = '50%';
                    onoffCircle.style.background = 'rgba(255,255,255,.8)';
                    onoffCircle.style.cursor = 'pointer';
                    onoffCircle.style.transition = 'all .5s ease 0s';
                    onoffCircle.addEventListener('click', function(){
                        if (onoffCircle.style.left == '2.5px'){
                            onoffCircle.style.left = 'calc(100% - 37.5px)';
                            onoff.style.background = 'lightgray';
                            onoff.style.border = '5px solid gray';
                            for (let i = 0; i < document.querySelectorAll('th').length; i++){
                                document.querySelectorAll('th')[i].style.background = 'gray';
                            }
                            for (let i = 0; i < document.querySelectorAll('td').length; i++){
                                document.querySelectorAll('td')[i].style.background = 'lightgray';
                            }
                        }
                        else{
                            onoff.style.border = '5px solid rgb(149, 201, 250)';
                            onoffCircle.style.left = '2.5px';
                            onoff.style.background = 'rgb(44, 138, 226)';
                            for (let i = 0; i < document.querySelectorAll('th').length; i++){
                                /*document.querySelectorAll('th')[i].style.border = '2px solid lightgray';*/
                                document.querySelectorAll('th')[i].style.background = 'linear-gradient(219deg, rgb(116 214 253), cornflowerblue)';
                                document.querySelectorAll('th')[i].style.backgroundSize = '500%';
                                document.querySelectorAll('th')[i].style.backgroundPosition = 'left';
                                document.querySelectorAll('th')[i].style.transition = 'all 1s ease 0s';
                            }
                            for (let i = 0; i < document.querySelectorAll('td').length; i++){
                                document.querySelectorAll('td')[i].style.transition = 'all 1s ease 0s';
                                document.querySelectorAll('td')[i].style.background = 'linear-gradient(219deg, lightyellow, rgb(255, 246, 126))';
                                document.querySelectorAll('td')[i].style.backgroundPosition = 'left';
                                document.querySelectorAll('td')[i].style.backgroundSize = '350%';
                            }
                        }
                    })
                    document.body.appendChild(onoff)
                    onoff.appendChild(onoffCircle)
                    for (let i = 0; i < document.querySelectorAll('th').length; i++){
                        /*document.querySelectorAll('th')[i].style.border = '2px solid lightgray';*/
                        document.querySelectorAll('th')[i].style.background = 'linear-gradient(219deg, rgb(116 214 253), cornflowerblue)';
                        document.querySelectorAll('th')[i].style.backgroundPosition = 'left';
                        document.querySelectorAll('th')[i].style.backgroundSize = '350%';
                        document.querySelectorAll('th')[i].style.fontWeight = 'normal';
                        document.querySelectorAll('th')[i].style.fontSize = '22px';
                        document.querySelectorAll('th')[i].style.margin = '0';
                        document.querySelectorAll('th')[i].style.transition = 'all 1s ease 0s';
                        document.querySelectorAll('th')[i].setAttribute('onmouseover', 'event.target.style.backgroundPosition = "right"');
                        document.querySelectorAll('th')[i].setAttribute('onmouseleave', 'event.target.style.backgroundPosition = "left"');
                    }
                    for (let i = 0; i < document.querySelectorAll('td').length; i++){
                        /*document.querySelectorAll('td')[i].style.border = '2px solid lightgray';*/
                        document.querySelectorAll('td')[i].style.background = 'linear-gradient(219deg, lightyellow, rgb(255, 246, 126))';
                        document.querySelectorAll('td')[i].style.backgroundPosition = 'left';
                        document.querySelectorAll('td')[i].style.backgroundSize = '500%';
                        document.querySelectorAll('td')[i].style.transition = 'all 1s ease 0s';
                        document.querySelectorAll('td')[i].setAttribute('onmouseover', 'event.target.style.backgroundPosition = "right"');
                        document.querySelectorAll('td')[i].setAttribute('onmouseleave', 'event.target.style.backgroundPosition = "left"');
                    }
                    document.querySelectorAll('td')[0].style.display = 'flex';
                    document.querySelectorAll('td')[0].style.width = 'calc(100% - 2px)';
                }
            }
            request.send()
        }
    }
}
const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Name', value: 'name'},
        {title: 'Surname', value: 'surname'},
        {title: 'Age', value: 'age'},
    ],
    apiUrl: "https://mock-api.shpp.me/vproshachenko/users"
};

const users1 = [
    {id: 30050, name: 'Pushok', surname: 'Murkovich', age: 3},
    {id: 30051, name: 'Anna', surname: 'Podkolzina', age: 21},
    {id: 30052, name: 'Yuliya', surname: 'Pirogova', age: 12}
];

DataTable(config1);