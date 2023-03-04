import { doc } from "prettier";
import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";

export default class admin{
    constructor(outputSelector){
        this.mainElement = document.querySelector(outputSelector)
        this.token = null;
        this.services = new ExternalServices();
    }

    async login (creds, next){
        try{
            this.token = await this.services.loginRequest(creds);
            next();
        } catch (err) {
            alertMessage(err.message.message);
        }
    }

    showLogin(){
        document.querySelector("#loginButton").addEventListener("click", (event) => {
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            this.login({email, password}, this.showOrders.bind(this));

        }
        );
    
    }

    async showOrders(){
        try{
            const orders = await this.services.getOrders(this.token);
            this.mainElement.innerHTML = orderTemplate();
            const parent = document.querySelector("#orders tbody");
            parent.innerHTML = orders
            .map(
                (order) =>
                `<tr><td>${order.id}</td><td>${new Date(
                    order.orderDate
                  ).toLocaleDateString("en-US")}</td><td>${
                    order.items.length
                  }</td><td>${order.orderTotal}</td></tr>`
            )
            .join("");
        } catch (err) {
            console.log(err);
        }
    }
    
}

function orderTemplate() {
    return `<h2>Current Orders</h2>
    <table id="orders">
    <thead>
    <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
    </thead>
    <tbody class="order-body"></tbody>
    </table>
    `;
  }