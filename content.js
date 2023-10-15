
const getNewPrice = (price) => Math.round(+price.slice(0, -2).replace(/\s/g, ""))*1.05;
const getelementsWithCurrency = () => Array.from(document.querySelectorAll("span, strong")).filter(elem =>
    elem.textContent.includes("₼") || elem.textContent.includes("AZN")
);

const styles = {
    container: `
        display: flex;
        align-items: center;
        background-color: #28982B;
        padding: 10px;
        width: fit-content;
        border-radius: 5px;
        left: 10px;`,
    checkbox: `
        width: 20px;
        height: 20px;
        border: 2px solid #fff;
        border-radius: 5px;
        cursor: pointer;
        left: 10px;`,
    price:`
        color: #fff;
        margin: 0;
        font-size: 16px;
        left: 10px;`
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Message received from background script.');
    
    if (request.action === 'add' && !document.querySelector('.green-extension-container')) {
        const elementsWithCurrency = getelementsWithCurrency();
        let elementCounter = 0;

        elementsWithCurrency.forEach(elem => {
            const newPrice = elem.textContent;
            const value = getNewPrice(newPrice);
            elementCounter = (elementCounter + 1) % 2;

            if (elem && value && elementCounter) {
                const container = document.createElement('div');
                container.className = 'green-extension-container';
                container.style.cssText = styles.container;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = 'green-checkbox';
                checkbox.style.cssText = styles.checkbox;

                const price = document.createElement('h4');
                price.id = 'green-price';
                price.textContent = `+5% (${value}₼) to plant a tree!`;
                price.style.cssText = styles.price;

                container.appendChild(checkbox);
                container.appendChild(price);

                elem.parentNode.insertBefore(container, elem.nextSibling);
            }
        });

        sendResponse({ message: 'Checkbox and price added with a new value.' });
    } else if (request.action === 'reset') {
        document.querySelectorAll('.green-extension-container').forEach(container => {
            container.remove();
        });
        sendResponse({ message: 'Website reset to the original state.' });
    }
});
