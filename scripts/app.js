"use strict";


(function(){

    /**
     * Adds a contact to the local storage
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function DisplayHomePage(){
        console.log("Home Page")
        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html"
        });
        // Main Paragraph
        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`);

        // Article


        $("body").append(`<article class="container">
                <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);

    }


    function DisplayProductPage(){
        console.log("Product Page")
    }
    function DisplayServicePage(){
        console.log("Service Page")
    }
    function DisplayAboutUsPage(){
        console.log("About us Page")
    }
    function DisplayContactPage() {
        console.log("Contact Us Page")
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function()
        {

            if(subscribeCheckbox.checked){
                console.log("Checkbox checked!")
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });

    }

    function DisplayContactListPage(){
        console.log("Contact List Page")

        if (localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);
            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         <td><button value="${key}" class="btn btn-primary btn-sm edit">
                            <i class="fas fa-edit fa-sm">Edit</i>
                            </button>
                         </td>
                         <td><button value="${key}" class="btn btn-danger btn-sm delete">
                            <i class="fas fa-trash fa-sm">Delete</i>
                            </button>
                         </td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }
        $("#addButton").on("click", () => {
            location.href = "edit.html#add"
        });
        $("button.delete").on("click", function () {
            if(confirm("Delete contact, are you sure?")) {
                localStorage.removeItem($(this).val())
            }
            location.href = "contact-list.html";
        });
        $("button.edit").on("click", function () {
            location.href = "edit.html#" + $(this).val();
        });
    }

    function DisplayEditPage(){
        console.log("Edit Page")
        let page = location.hash.substring(1);
        switch(page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(` <i class="fas fa-plus-circle fa-sm"></i> Add`).on("click", () => {
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                })
                break;
            default:{
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));
                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);
                $("#editButton").on("click", (event) => {
                    event.preventDefault();
                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#contactNumber").val();
                    contact.EmailAddress = $("#emailAddress").val();
                    localStorage.setItem(page, contact.serialize());
                    location.href = "contact-list.html";
                })
            }
            break;
        }
        $("#cancelButton").on("click", () => {
            location.href = "contact-list.html"
        })
    }

    function Start()
    {
        console.log("App Started!")

        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Products":
                DisplayProductPage();
                break;
            case "Services":
                DisplayServicePage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
        }


    }
    window.addEventListener("load", Start)
})();


