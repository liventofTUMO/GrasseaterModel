let obj = {
    first_name = "Liam",
    last_name = "Wiren-Chapel",

    sayHello(){
        console.log("Hello There!", this.first_name)
    }
}

console.log(obj);
console.log(obj.last_name);
obj.sayHello();