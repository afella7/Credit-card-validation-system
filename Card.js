function getCardType(cardNumber) {
    const cardPatterns = {
        'Visa': /^4[0-9]{12}(?:[0-9]{3})?$/, // Starts with 4, 13 or 16 digits
        'MasterCard': /^5[1-5][0-9]{14}$/, // Starts with 51-55, 16 digits
        'American Express': /^3[47][0-9]{13}$/, // Starts with 34 or 37, 15 digits
        'Discover': /^6(?:011|5[0-9]{2})[0-9]{12}$/, // Starts with 6011 or 65, 16 digits
    };
    
    for (let [card, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(cardNumber)) {
            return card;
        }
    }
    return 'Unknown';
}

function validateLuhn(cardNumber) {
    let sum = 0;
    let alternate = false;
    
    cardNumber = cardNumber.replace(/\D/g, ""); // Remove non-digit characters
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let num = parseInt(cardNumber.charAt(i), 10);
        
        if (alternate) {
            num *= 2;
            if (num > 9) num -= 9;
        }
        
        sum += num;
        alternate = !alternate;
    }
    
    return sum % 10 === 0;
}

function validateCard(cardNumber) {
    const cardType = getCardType(cardNumber);
    const isValid = validateLuhn(cardNumber);
    
    return {
        cardType,
        isValid
    };
}

// Example Usage
const cardNumber = "4111111111111111"; // Sample Visa card number
const result = validateCard(cardNumber);
console.log(`Card Type: ${result.cardType}, Valid: ${result.isValid}`);
