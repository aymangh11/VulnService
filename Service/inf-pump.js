function caesarCipherEncrypt(text, key) {
    let encrypted = '';
    let keyIndex = 0;

    // Loop through each character in the text
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let shift = key[keyIndex % key.length].charCodeAt(0) - 97; // 'a' = 97
        
        // Check if the character is a letter
        if (/[a-zA-Z]/.test(char)) {
            let charCode = char.charCodeAt(0);

            // Determine if the character is uppercase or lowercase
            if (charCode >= 65 && charCode <= 90) {  // Uppercase letters
                char = String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
            } else if (charCode >= 97 && charCode <= 122) {  // Lowercase letters
                char = String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
            }
        }

        encrypted += char;
        keyIndex++;
    }

    return encrypted;
}

function startAdministration(event) {
    event.preventDefault();  // Prevent the form from submitting and reloading the page

    const medicine = document.getElementById("medicine").value;
    const rate = document.getElementById("rate").value;
    const volume = document.getElementById("volume").value;

    // Hint for the encryption method (subtle)
    document.getElementById("hint").innerText = "Sometimes, a key can unlock the puzzle by shifting the pieces around...";

    if (volume > 10000) {
        fetch('/flag')  // Now fetching the symbolic link /flag
            .then(response => response.text())
            .then(data => {
                const encryptedFlag = caesarCipherEncrypt(data, 'antidote');  // Encrypt the flag using the word 'antidote'
                document.getElementById("output").innerHTML = `<pre>${encryptedFlag}</pre>`;  // Display the encrypted flag
            });
    } else {
        document.getElementById("output").innerText = `Administering ${medicine} at ${rate} minutes, ${volume} ml.`;
    }
}

// Attach the function to the form's submit event
document.querySelector('form').addEventListener('submit', startAdministration);