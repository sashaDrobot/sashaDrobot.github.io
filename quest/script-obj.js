function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if(pair[0] === variable){
            return pair[1];
        }
    }
    return(false);
}

let log="";

const db = firebase.database();

const page = {
    ref: db.ref(`page${Math.max(1,getQueryVariable('p'))}`),
    task: document.getElementsByClassName('task')[0],
    show: function(item) {
        switch (item.key) {
            case "img":
                let image = document.createElement('img');
                image.src = item.val();
                this.task.insertBefore(image,  this.task.children[1]);
                break;
            case "title":
            case "text":
                this.task.getElementsByClassName(item.key)[0].innerHTML = item.val();
                break;
            case "links":
                this.showLinks(item.val());
                break;
        }
    },
    showLinks: function(item){
        for (let link in item){
            this.task.getElementsByClassName("links")[0].innerHTML+= `<li><a href="index.html?p=${item[link]}">${link}</a></li>`;
        }
    }
};

page.ref.on('child_added', function (data) {
    page.show(data);
});
page.ref.on('child_changed', function (data) {
    page.show(data);
});