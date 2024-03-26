function register() {
    const user = {
        accountnum: acno.value,
        username: username.value,
        password: pswd.value,
        balance: initialdeposit.value
    }
    if (user.accountnum == "" || user.username == "" || user.password == "" || user.balance == "") {
        alert("Please fill the details");
    }
    else if (isNaN(Number(user.balance))) {
        alert("Please enter a valid amount for initial deposit.");
    }
    else if (user.accountnum in localStorage) {
        alert("This account number is already registered with us.");
    }
    else {
        localStorage.setItem(user.accountnum, JSON.stringify(user));
        alert("Registered Successfully")
        window.location = "./login.html";
    }
}


function login() {
    var accountnumber = acno.value;
    if (accountnumber in localStorage) {
        var user = JSON.parse(localStorage.getItem(accountnumber));
        if (pswd.value == user.password) {
            localStorage.setItem("loggedInAcno", accountnumber);
            window.location = "./services.html";
        }
        else {
            alert("Password is incorrect. Please try again!");
        }
    }
    else {
        alert("Invalid account number. Please try again!");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var loggedInAcno = localStorage.getItem("loggedInAcno");
    var user = JSON.parse(localStorage.getItem(loggedInAcno));
    document.querySelector("#un").innerHTML = `&nbsp;${user.username}`;
    document.querySelector("#accBal").innerHTML=`Account Balance : ${user.balance}`
});


function deposit() {
    var loggedInAcno = localStorage.getItem("loggedInAcno");
    var user = JSON.parse(localStorage.getItem(loggedInAcno));
    if (dpswd.value == user.password) {
        if (isNaN(Number(damt.value))) {
            alert("Please enter a valid amount");
        }
        else {
            user.balance = Number(user.balance) + Number(damt.value);
            localStorage.setItem(user.accountnum, JSON.stringify(user));
            alert(`Rs.${damt.value} has been added to your account.`);
            dpswd.value = '';
            damt.value = '';
            document.querySelector("#accBal").innerHTML=`Account Balance : ${user.balance}`
            document.querySelector("#dbal").innerHTML = `Your current balance is ${user.balance}`;
            setTimeout(function () {
                document.querySelector("#dbal").innerHTML = '';
            }, 3000);
        }
    }
    else {
        alert("Incorrect Password. Try Again.")
    }
}

function withdraw() {
    var loggedInAcno = localStorage.getItem("loggedInAcno");
    var user = JSON.parse(localStorage.getItem(loggedInAcno));
    if (wpswd.value == user.password) {
        if (isNaN(Number(wamt.value))) {
            alert("Please enter a valid amount");
        }
        else {
            if (Number(wamt.value) > Number(user.balance)) {
                alert("Insufficient balance.")
            }
            else {
                user.balance = Number(user.balance) - Number(wamt.value);
                localStorage.setItem(user.accountnum, JSON.stringify(user));
                alert(`Rs.${wamt.value} has been withdrawn from your account.`);
                wpswd.value = '';
                wamt.value = '';
                document.querySelector("#accBal").innerHTML=`Account Balance : ${user.balance}`
                document.querySelector("#wbal").innerHTML = `Your current balance is ${user.balance}`;
                setTimeout(function () {
                    document.querySelector("#wbal").innerHTML = '';
                }, 3000);
            }
        }
    }
    else {
        alert("Incorrect Password. Try Again.")
    }
}

function logout() {
    localStorage.removeItem("loggedInAcno");
    window.location = "./index.html";
}