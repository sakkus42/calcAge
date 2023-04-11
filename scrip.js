class Input{
	constructor(inputId, messageId, redID){
		this.inputId = inputId;
		this.messageId = messageId;
		this.dom = document.getElementById(this.inputId);
		this.error = document.getElementById(this.messageId);
		this.value = 0;
		this.messageText = 0;
		this.errorFlag = 0;
	}
	get getDom(){
		return this.dom;
	}
	get getError(){
		return this.error;
	}
	get getAllError(){
		return this.allError;
	}
	get getValue(){
		return this.value;
	}
	get getInputId(){
		return this.inputId;
	}
	get getMessageText(){
		return this.messageText;
	}
	setValue(value){
		this.value = value;
	}
	setErrorValues(valueMessage, valueFlag){
		this.messageText = valueMessage;
		this.errorFlag = valueFlag;
	}
	writeError(){
		if (this.messageText){
			this.dom.style.color = "var(--light-red)";
			this.error.innerHTML = this.messageText;
		}else{
			this.dom.style.color = "var(--Off-black)";
			this.error.innerHTML = "";
		}
	}
}

function isNum(input){
	if (isNaN(input.getValue))
	{
		input.setErrorValues("please enter only numbers", 1);
	}else if (input.getValue < 0)
	{
		input.setErrorValues("please enter only positive numbers", 1);
	}else{
		input.setErrorValues(0, 0);
	}
}

function dayCntrl(input){
	if (input.inputId != "dd")
		return ;
	if (input.value > 31)
		input.setErrorValues("invalid day1", 1);
}

function monthCntrl(input){
	if (input.inputId != 'mm'){
		return;
	}
	if (input.value > 12)
	{
		input.setErrorValues("invalid month", 1);
		return (1);
	}
}

function yearCntrl(input){
	if (input.inputId != 'yyy'){
		return;
	}
	if (tdYear < input.value)
		input.setErrorValues("invalid year", 1);
}

function errorMesage(input){
	isNum(input);
	dayCntrl(input);
	monthCntrl(input);
	yearCntrl(input);
	input.writeError();
}

function cntrInput(input){
	input.getDom.addEventListener("input", function(event){
		const val = event.target.value;
		input.setValue(val);
		// funcWrite(input);
		errorMesage(input);
		console.log(input.errorFlag);
	})
}

function yearCntrl2(){
	console.log(yearCntrl2.arguments[0]);
}


function whichMonth(value){
	var thirty = [4, 6, 9, 11];
	var thirtyOne = [1, 3, 5, 7, 8, 12];
	if (thirty.find(element => element == month.value))
		return (30);
	else if(thirtyOne.find(element => element == month.value))
		return (31);
	else
		return (!(year.value % 4) ? 29 : 28);
}

function output(e){
	var nowYear = date.getFullYear();
	var nowMonth = date.getMonth() + 1;
	var nowDay = date.getDate();
	// 2023/04/42
	// 2000/12/12
	///30
	if (nowDay < day.value){
		nowDay = nowDay - day.value + whichMonth(month.value);
		console.log(whichMonth(month.value));
		nowMonth--;
	}else{
		nowDay -= day.value;
	}
	if (nowMonth < month.value){
		nowMonth = nowMonth - month.value + 12;
		nowYear--;
	}else{
		nowMonth -= month.value;
	}
	console.log("output");
	document.getElementById("year").innerHTML = nowYear - year.value;
	document.getElementById("month").innerHTML = nowMonth;
	document.getElementById("day").innerHTML = nowDay;
}

function outputClear(){
	let element = document.querySelectorAll("span");
	element.forEach(item => {
		if (month.errorFlag || year.errorFlag || day.errorFlag){
			item.style.color = "var(--light-red)";
		}
		else
			item.style.color = "var(--purple)";
		item.innerHTML = "--";
	})
}
function writeOutput(){
	if (day.errorFlag || month.errorFlag || year.errorFlag || !month.value || !year.value || !day.value)
	{
		console.log("clear");
		outputClear();
		return;
	}
	outputClear();
	output();
}

function cntrlAll(){
	let element = document.querySelectorAll("input");
	cntrInput(day);
	cntrInput(month);
	cntrInput(year);
	element.forEach(item =>{
		item.addEventListener('input', e => {
			if (day.errorFlag && month.errorFlag && year.errorFlag)
				return;
			if ((month.value > tdMonth && tdYear == year.value) || (monthCntrl(month)))	
			{
				console.log(month.value + tdMonth);
				month.setErrorValues("Invalid month", 2);
			}else{
				if (month.errorFlag == 2)
					month.setErrorValues("", 0);
			}
			if (day.value > whichMonth(month.value) || (day.value > tdDay && year.value == tdYear && month.errorFlag == 2))
				day.setErrorValues("Invalid day", 2);
			else{
				if (day.errorFlag == 2)
					day.setErrorValues("", 0);
			}
			month.writeError();
			day.writeError();
			writeOutput();
		})
	})
}

const day = new Input("dd", "dayMessage");
const month = new Input("mm", "monthMessage");
const year = new Input("yyy", "yearMessage");
const allMessage = document.querySelectorAll(".red-color");
const date = new Date();
var tdYear = date.getFullYear();
var tdMonth = date.getMonth() + 1;
var tdDay = date.getDate();


cntrlAll();
