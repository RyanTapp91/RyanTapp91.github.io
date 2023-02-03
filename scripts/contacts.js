class Contact{

    // Constructor
    constructor( fullName = "", contactNumber = "", emailAddress = "" ){

        this.fullName = fullName;
        this.contactNumber = contactNumber;
        this.emailAddress = emailAddress;
    }

    // Getters

    get FullName(){
        return this.fullName;
    }
    get ContactNumber(){
        return this.contactNumber
    }
    get EmailAddress(){
        return this.emailAddress;
    }

    // Setters
    set FullName(fullName){
        this.fullName = fullName;
    }
    set ContactNumber(contactNumber){
        this.contactNumber = contactNumber;
    }
    set EmailAddress(emailAddress){
        this.emailAddress = emailAddress;
    }
    toString(){
        return `Full Name: ${this.FullName}\n Contact Number: ${this.ContactNumber}\n Email Address ${this.EmailAddress}`;

    }

    serialize(){
        if(this.FullName != "" && this.ContactNumber != "" && this.EmailAddress != ""){
            return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
        }
        console.error("One or more of the properties of the Contact object are missing or invalid")
        return null;
    }

    deserialize(data){
        let propertyArray = data.split(",");
        this.FullName = propertyArray[0];
        this.ContactNumber = propertyArray[1];
        this.EmailAddress = propertyArray[2];
    }
}