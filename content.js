chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Message received from background script.');
    if (request.action === 'add') {

        const offerPriceElement = document.querySelector('.MPProductMainDesc-OfferPrice');
        if (offerPriceElement) {
            const container = document.createElement('div');
            container.className = 'green-extension-container';
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.backgroundColor = '#4CAF50';
            container.style.padding = '10px';
            container.style.width = 'fit-content';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'green-checkbox';
            checkbox.style.width = '20px'; 
            checkbox.style.height = '20px'; 
            checkbox.style.border = '2px solid #fff'; 
            checkbox.style.borderRadius = '5px'; 
            checkbox.style.cursor = 'pointer';

            const newPriceElement = document.querySelector('[data-info="item-desc-price-new"]');
            if (newPriceElement) {
                const newPrice = newPriceElement.textContent;

                const price = document.createElement('h4');
                price.id = 'green-price';
                price.textContent = `${Math.round(+newPrice.slice(0, -2).replace(/\s/g, ""))+5} ₼, pay and plant a tree!`;
                price.style.color = "#fff";
                price.style.margin = '0';
                price.style.fontSize = '16px';

                container.appendChild(checkbox);
                container.appendChild(price);

                offerPriceElement.parentNode.insertBefore(container, offerPriceElement.nextSibling);
            }
        }
        sendResponse({ message: 'Checkbox and price added with a new value.' });
    } else if (request.action === 'reset') {
        const container = document.querySelector('.green-extension-container');
        if (container) {
            container.remove();
        }
        sendResponse({ message: 'Website reset to the original state.' });
    }
});
