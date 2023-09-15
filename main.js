var form = document.getElementById('my-form');

form.addEventListener('submit',getValues);

function getValues(e){
	e.preventDefault();
	var amount = document.getElementById('amount').value;
	var description = document.getElementById('description').value;
	var category  = document.getElementById('category').value;
	//console.log(amount,description,category);

	var itemList = document.getElementById('list');

	var li = document.createElement('li');
	li.className = 'item';
	var delbutton = document.createElement('button');
	delbutton.className = 'float-right delete';
	var editButton = document.createElement('button');
	editButton.className = 'float-right edit mr-3';

	delbutton.appendChild(document.createTextNode('Delete'));
	editButton.appendChild(document.createTextNode('Edit'));

	li.appendChild(document.createTextNode(`${amount}, ${description}, ${category}`));

	li.appendChild(editButton);
	li.appendChild(delbutton);
	itemList.appendChild(li);
	document.getElementById('amount').value='';
	document.getElementById('description').value='';
	document.getElementById('category').value='';
	let myObj = {
		amount : amount,
		description : description,
		category : category
	};

	let myObjStringify = JSON.stringify(myObj);
	localStorage.setItem(description,myObjStringify);
	savedata();

}


var itemList = document.getElementById('list');
itemList.addEventListener('click',(e)=>{
	e.preventDefault();

	if(e.target.classList.contains('delete')){
		var li = e.target.parentElement;
		var text = li.innerText;
		var individualText = text.split(", ");
		var description = individualText[1];
		localStorage.removeItem(description);
		itemList.removeChild(li);
		savedata();

	}
	else if(e.target.classList.contains('edit')){
		var li = e.target.parentElement;
		var text = li.innerText;
		var individualText = text.split(", ");
		var description = individualText[1];
		var myObj = localStorage.getItem(description);
		localStorage.removeItem(description);
		var myObjdeStringify = JSON.parse(myObj);
		itemList.removeChild(li);
		document.getElementById('amount').value = myObjdeStringify.amount;
		document.getElementById('description').value = myObjdeStringify.description;
		document.getElementById('category').value = myObjdeStringify.category;
		savedata();
	}
});

var listcontainer = document.getElementById('list');
function savedata(){
	localStorage.setItem("data",listcontainer.innerHTML);
}

function displayList(){
	listcontainer.innerHTML=localStorage.getItem("data");
}

displayList();