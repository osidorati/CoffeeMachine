const input = require('sync-input');

let status = {
    water : 400,
    milk : 540,
    beans : 120,
    cups : 9,
    money : 550,
}

const coffee = [
    espresso = {
        water: 50,
        milk: 0,
        beans: 16,
        cost: 4
    },
    latte = {
        water: 350,
        milk: 75,
        beans: 15,
        cost: 7
    },
    cappuccino = {
        water: 200,
        milk: 100,
        beans: 20,
        cost: 6
    }
]

//information output
const remain = () => {
    console.log(`The coffee machine has:
${status.water} ml of water
${status.milk} ml of milk
${status.beans} g of coffee beans
${status.cups} disposable cups
$${status.money} of money`)
}

//check if there are enough ingredients
const checkIngredients = (numCoffee) => {
    if ((status.water >= coffee[numCoffee].water) && (status.milk >= coffee[numCoffee].milk) && (status.beans >=
        coffee[numCoffee].beans) && (status.cups >= 1)) {
        console.log("Hooray, all the ingredients are available!");
        return true;
    }
    else {
        if (status.water < numCoffee.water) {
            console.log('Sorry, not enough water!');
        }
        if (status.milk < numCoffee.milk) {
            console.log('Sorry, not enough milk!');
        }
        if (status.beans < numCoffee.beans) {
            console.log('Sorry, not enough beans!');
        }
        if (status.cups < 1) {
            console.log('Sorry, not enough cups!');
        }
        return false;
    }
}

const pay = (numCoffee) => {
    let money = 0;
    while (money !== coffee[numCoffee].cost) {
        money = Number(input(`Please deposit ${coffee[numCoffee].cost}$ or exit (0) `));
        if (money === 0) {
            return false;
        }
    }
    return true;
}

const purchase = (numCoffee) => {
    status.water -= coffee[numCoffee].water;
    status.beans -= coffee[numCoffee].beans;
    --status.cups;
    status.money += coffee[numCoffee].cost;
}

const proccessing = (numCoffee) => {
    console.log('Check if the ingredients are available..');
    if (checkIngredients(numCoffee)) {
        if (pay(numCoffee)) {
            console.log('Thank you for the order');
            purchase(numCoffee);
            console.log('Your coffee is being prepared...');
            console.log('Your coffee is ready! Thanks for the purchase');
        }
    }
}

while(true) {
    let action = input('Write action (buy, fill, take, remaining, exit):');
    switch (action) {

        case 'remaining':
            remain();
            break;

        case 'buy':
            let coffee = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:');
            let numCoffee = Number(coffee) - 1;
            switch (coffee) {
                case '1':
                case '2':
                case '3':
                    proccessing(numCoffee);
                    break;
            }
            break;

        case 'fill':
            status.water += Number(input("Write how many ml of water you want to add:"));
            status.milk += Number(input("Write how many ml of milk you want to add:"));
            status.beans += Number(input("Write how many grams of coffee beans you want to add:"));
            status.cups += Number(input("Write how many disposable coffee cups you want to add:"));
            break;

        case 'take':
            console.log(`I gave you $${status.money}`);
            status.money = 0;
            break;

        case 'exit':
            break;
    }
}
