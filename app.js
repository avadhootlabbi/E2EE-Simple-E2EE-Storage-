let currentUser = null;
let masterKey = null;
let simulatedDB = {}; // Acts as our "Server"

function log(msg) {
    const div = document.getElementById('log');
    div.innerHTML += `> ${msg}<br>`;
    div.scrollTop = div.scrollHeight;
}

async function register() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (!user || !pass) return alert("Enter username and password");
    if (simulatedDB[user]) return alert("User already exists!");

    log(`Generating keys for ${user}...`);
    
    // 1. Generate Salt
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    
    // 2. Derive Master Key
    masterKey = await deriveKey(pass, salt);
    
    // 3. Generate Identity Keys (Simulated)
    const keyPair = await generateKeyPair();
    
    // 4. Save to "Server" (localStorage)
    // In real app: Encrypt Private Key with Master Key before sending
    simulatedDB[user] = {
        salt: Array.from(salt),
        publicKey: keyPair.publicKey, // Simplified for demo
        files: {}
    };

    log(`Registration successful! Keys generated.`);
    document.getElementById('uploadSection').style.display = 'block';
    currentUser = user;
}

async function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (!simulatedDB[user]) return alert("User not found");

    log(`Logging in as ${user}...`);
    
    // 1. Retrieve Salt
    const salt = new Uint8Array(simulatedDB[user].salt);
    
    // 2. Derive Master Key
    masterKey = await deriveKey(pass, salt);
    
    log("Login successful! Decryption key ready.");
    document.getElementById('uploadSection').style.display = 'block';
    document.getElementById('downloadSection').style.display = 'block';
    currentUser = user;
}

async function uploadFile() {
    if (!currentUser) return;
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) return alert("Select a file");

    const file = fileInput.files[0];
    log(`Reading file: ${file.name}...`);

    const arrayBuffer = await file.arrayBuffer();
    
    // 3. Encrypt Data
    log("Encrypting data client-side...");
    const encrypted = await encryptData(arrayBuffer, masterKey);
    
    // 4. Simulate Upload
    const fileId = Date.now().toString();
    simulatedDB[currentUser].files[fileId] = {
        name: file.name,
        encryptedData: encrypted,
        size: file.size
    };

    document.getElementById('blobId').innerText = fileId;
    log(`File encrypted and "uploaded". ID: ${fileId}`);
}

async function downloadFile() {
    if (!currentUser) return;
    const fileId = document.getElementById('blobId').innerText;
    
    if (fileId === "None" || !simulatedDB[currentUser].files[fileId]) {
        return alert("No file found or ID invalid");
    }

    log("Fetching encrypted blob...");
    const fileData = simulatedDB[currentUser].files[fileId];
    
    // 5. Decrypt Data
    log("Decrypting data client-side...");
    try {
        const decryptedBuffer = await decryptData(fileData.encryptedData, masterKey);
        
        // Create a downloadable link
        const blob = new Blob([decryptedBuffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileData.name;
        a.click();
        URL.revokeObjectURL(url);
        
        log(`File decrypted and downloaded: ${fileData.name}`);
    } catch (e) {
        log("Decryption failed! Wrong password or corrupted data.");
        console.error(e);
    }
}
