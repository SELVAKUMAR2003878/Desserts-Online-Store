const addButton = document.querySelectorAll(".image button");
const items = document.querySelectorAll(".item")[0];
const total = document.getElementById("count");
const totalAmount = document.getElementById("totalAmount");
const show = document.getElementById("show");
let totalAmountValue = 0;
let count = 0;
let FoodName = [];

addButton.forEach((button) => {
    button.addEventListener("click", (event) => {
        show.style.display = "block";
        setTimeout(() => {show.style.display = "none"} , 3000);
        count++;
        total.textContent = count;
        const itemName = document.createElement("h3");
        const spanCount = document.createElement("span");
        //const spanAmount = document.createElement("span");
        const spanCountAmount = document.createElement("span");
        const spandiv = document.createElement("p");
        const CancelButton = document.createElement("button");
        const image = document.createElement("img");
        image.src = event.target.parentElement.parentElement.getElementsByTagName("img")[0].src;
        image.style.width = "100px";
        //console.log(event.target.parentElement.parentElement.getElementsByTagName("img")[0].src);

        itemName.textContent = event.target.parentElement.parentElement.parentElement.getElementsByClassName("text")[0].textContent;
        FoodName.push(itemName.textContent);
        spanCount.textContent = "1x";
        spandiv.classList.add("cash");
        //spanAmount.textContent = `@${event.target.parentElement.parentElement.parentElement.getElementsByClassName("cash")[0].textContent}`;
        spanCountAmount.textContent = event.target.parentElement.parentElement.parentElement.getElementsByClassName("cash")[0].textContent;
        let CashAmount = (event.target.parentElement.parentElement.parentElement.getElementsByClassName("cash")[0].textContent).split("$")[1];
        CashAmount = Number(CashAmount);
        totalAmountValue += CashAmount;
        totalAmount.textContent = totalAmountValue;
        CancelButton.textContent = "Delete";

        CancelButton.addEventListener("click", event => {
            event.target.parentElement.remove();
            count--;
            total.textContent = count;
            //console.log(event.target.parentElement.getElementsByClassName("cash")[0].textContent.split("$")[1]);
            totalAmountValue -= Number(event.target.parentElement.getElementsByClassName("cash")[0].textContent.split("$")[1]);
            totalAmount.textContent = totalAmountValue;
            
            //FoodName = FoodName.filter((item) => item !== event.target.parentElement.getElementsByTagName("h3")[0].textContent);
            for(let i = 0;i < FoodName.length;i++) {
                if(FoodName[i] === event.target.parentElement.getElementsByTagName("h3")[0].textContent) {
                    FoodName[i] = "";
                    break;
                }

            }
        });
        const item = document.createElement("div");

        spandiv.append(spanCount, spanCountAmount);
        item.append(image, itemName, spandiv, CancelButton);
        items.appendChild(item);

    })
});
const Name = document.getElementById("Name");
const Phone = document.getElementById("phone");
const address = document.getElementById("address");
const Amount = document.getElementById("amount");


async function order() {
    if (count === 0 )  {
        window.alert("please add items to cart");
    }
    else if( Name.value === ""  ||Name.value == null || Phone.value == null || Phone.value === "" || address.value === "" || address.value == null ){
        window.alert("Please Enter a Details");
    }
    
    else {

        var phoneNumber = "+917483715717";

        var url = "https://wa.me/" + phoneNumber + "?text="
        + "Name : " + Name.value + "%0a"
        + "PhoneNumber : " + Phone.value + "%0a"
        + "Address : " + address.value + "%0a"
        + "Count : " + count + "%0a"
        + "FoodName's : " + FoodName + "%0a"
        + "Type : " + Amount.value + "%0a"
        + "Total Amount : $" + totalAmountValue + "%0a";
        await window.open(url , "_blank").focus();

        items.innerHTML = "";
        totalAmountValue = 0;
        totalAmount.textContent = totalAmountValue;
        count = 0;
        total.textContent = count;
        FoodName = [];
        Name.value = "";
        Phone.value = "";
        address.value = "";

    }
}
