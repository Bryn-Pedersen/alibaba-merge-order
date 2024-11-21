document.getElementById("merge-button").addEventListener("click", function () {
    // getting selected orders
    const selectedOrders = Array.from(document.querySelectorAll(".merge-checkbox:checked"));
    const orderIds = selectedOrders.map((checkbox) => checkbox.getAttribute("data-order-id"));

    console.log("Selected Orders: ", selectedOrders); 
    console.log("Order IDs: ", orderIds); 

    // merge order logic (pretend its based on shippinh or something)
    const qualifyingOrders = ["1", "2"]; 
    const invalidOrders = orderIds.filter((id) => !qualifyingOrders.includes(id));

    // handling merge errors
    if (invalidOrders.length > 0) {
        showModal("Error: One or more selected orders cannot be merged.");
    } else if (orderIds.length < 2) {
        showModal("Please select at least two orders to merge.");
    } else {
        // calc the total price and quantity
        let totalPrice = 0;
        let totalQuantity = 0;

        selectedOrders.forEach((checkbox) => {
            const unitPrice = parseFloat(checkbox.getAttribute("data-unit-price"));
            const shippingFee = parseFloat(checkbox.getAttribute("data-shipping-fee"));
            const quantity = parseInt(checkbox.getAttribute("data-quantity"), 10);

            console.log(`Unit Price: ${unitPrice}, Shipping Fee: ${shippingFee}, Quantity: ${quantity}`); // debugging

            // checking parse
            if (isNaN(unitPrice) || isNaN(shippingFee) || isNaN(quantity)) {
                showModal("Error: Invalid order data.");
                return;
            }

            totalPrice += (unitPrice * quantity) + shippingFee;
            totalQuantity += quantity;
        });

        console.log(`Total Quantity: ${totalQuantity}, Total Price: ${totalPrice}`); // debugging

        // checking total price and qunt
        if (isNaN(totalPrice) || isNaN(totalQuantity)) {
            showModal("Error: There was an issue with calculating the total.");
        } else {
            showModal(`Merge Successful: ${totalQuantity} items merged. Total Price: US $${totalPrice.toFixed(2)}`);
        }
    }
});

//displaying modal
function showModal(message) {
    const modal = document.getElementById("merge-modal");
    const modalMessage = document.getElementById("modal-message");
    modalMessage.textContent = message;
    modal.style.display = "block";
    console.log("Modal displayed with message: ", message); // debug
}

// close button functionality
document.getElementById("modal-close").addEventListener("click", function () {
    const modal = document.getElementById("merge-modal");
    modal.style.display = "none";
    console.log("Modal closed"); //debug
});

// more close modal 
window.onclick = function (event) {
    const modal = document.getElementById("merge-modal");
    if (event.target === modal) {
        modal.style.display = "none";
        console.log("Modal closed by clicking outside"); // debug
    }
};
