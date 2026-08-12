// Generator Logic for Hacker House Goa 2026 ID/Frame Generator

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const nameInput = document.getElementById('name-input');
    const githubInput = document.getElementById('github-input');
    const roleSelect = document.getElementById('role-select');
    const previewImage = document.getElementById('preview-image');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const previewContainer = document.getElementById('preview-container');
    const themeSelect = document.getElementById('theme-select');

    // Navigation and Page Controls
    const getStartedBtn = document.getElementById('get-started-btn');
    const generatorSection = document.getElementById('generator-section');
    const navHome = document.querySelectorAll('.nav-home');
    const navGenerator = document.querySelectorAll('.nav-generator');
    const heroSection = document.getElementById('hero-section');

    let userImage = null;

    // View Navigation handling
    function showSection(section) {
        if (section === 'generator') {
            heroSection.classList.add('hidden');
            generatorSection.classList.remove('hidden');
            generatorSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            heroSection.classList.remove('hidden');
            generatorSection.classList.add('hidden');
        }
    }

    navHome.forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); showSection('home'); }));

    // Drag & Drop / File Select Event Listeners
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('bg-primary-container', 'text-black');
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('bg-primary-container', 'text-black');
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('bg-primary-container', 'text-black');
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                userImage = img;
                updatePreview();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Input Change Event Listeners
    nameInput.addEventListener('input', updatePreview);
    githubInput.addEventListener('input', updatePreview);
    roleSelect.addEventListener('change', updatePreview);
    themeSelect.addEventListener('change', updatePreview);

    // Canvas Rendering config
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000; // ID Badge format (800x1000)
    const ctx = canvas.getContext('2d');

    function updatePreview() {
        if (!userImage) {
            // Draw placeholder template
            drawBadge(null);
            return;
        }
        drawBadge(userImage);
    }

    function drawBadge(img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Background Fill
        const isDarkTheme = themeSelect.value === 'dark';
        ctx.fillStyle = isDarkTheme ? '#14140f' : '#F8FAFC';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Brutalist Grid Background Pattern
        ctx.strokeStyle = isDarkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
        ctx.lineWidth = 1;
        const gridGap = 40;
        for (let x = 0; x < canvas.width; x += gridGap) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridGap) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // 3. Draw User Image in center card style
        const imgSize = 400;
        const imgX = (canvas.width - imgSize) / 2;
        const imgY = 180;

        ctx.save();
        // Image Neo-Brutalist Frame
        ctx.fillStyle = '#000000';
        ctx.fillRect(imgX + 8, imgY + 8, imgSize, imgSize); // Shadow

        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 6;
        ctx.fillStyle = '#1c1c17';
        ctx.fillRect(imgX, imgY, imgSize, imgSize);
        ctx.strokeRect(imgX, imgY, imgSize, imgSize);

        if (img) {
            // Draw cropped & fitted image
            ctx.beginPath();
            ctx.rect(imgX + 3, imgY + 3, imgSize - 6, imgSize - 6);
            ctx.clip();

            const hRatio = imgSize / img.width;
            const vRatio = imgSize / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (imgSize - img.width * ratio) / 2;
            const centerShift_y = (imgSize - img.height * ratio) / 2;

            ctx.drawImage(img, 0, 0, img.width, img.height, 
                          imgX + centerShift_x, imgY + centerShift_y, img.width * ratio, img.height * ratio);
        } else {
            // Draw camera placeholder icon/text
            ctx.fillStyle = '#ffffff';
            ctx.font = '700 16px "JetBrains Mono"';
            ctx.textAlign = 'center';
            ctx.fillText('[ NO AVATAR UPLOADED ]', canvas.width / 2, imgY + (imgSize / 2) + 5);
        }
        ctx.restore();

        // 4. Header Bar / Top Brand Sticker
        ctx.fillStyle = '#E5137A'; // Neon Pink
        ctx.fillRect(0, 0, canvas.width, 100);
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(0, 100);
        ctx.lineTo(canvas.width, 100);
        ctx.stroke();

        // Title text in pink header
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.font = '800 36px "Bricolage Grotesque"';
        ctx.fillText('HACKER HOUSE GOA 2026', canvas.width / 2, 62);

        // 5. Card text details (Name, GitHub, Role)
        const nameVal = nameInput.value.trim().toUpperCase() || 'YOUR NAME';
        const githubVal = githubInput.value.trim() ? `@${githubInput.value.trim().replace(/^@/, '')}` : '@github_handle';
        const roleVal = roleSelect.value.toUpperCase();

        // Role badge layout (Sticker style)
        let roleBgColor = '#22c55e'; // Green
        if (roleVal === 'BUILDER') roleBgColor = '#06B6D4'; // Cyan
        if (roleVal === 'DESIGNER') roleBgColor = '#fd56a7'; // Pink
        if (roleVal === 'SPEAKER') roleBgColor = '#ffdf9a'; // Yellow

        // Draw Role Sticker
        const badgeW = 260;
        const badgeH = 50;
        const badgeX = (canvas.width - badgeW) / 2;
        const badgeY = 620;

        ctx.save();
        ctx.fillStyle = '#000000';
        ctx.fillRect(badgeX + 4, badgeY + 4, badgeW, badgeH); // Shadow
        ctx.fillStyle = roleBgColor;
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 4;
        ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
        ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);
        
        ctx.fillStyle = '#0F172A';
        ctx.font = '700 20px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.fillText(roleVal, canvas.width / 2, badgeY + 32);
        ctx.restore();

        // Full Name text
        ctx.fillStyle = isDarkTheme ? '#ffffff' : '#0F172A';
        ctx.font = '800 48px "Bricolage Grotesque"';
        ctx.textAlign = 'center';
        ctx.fillText(nameVal, canvas.width / 2, 740);

        // GitHub username
        ctx.fillStyle = '#E5137A';
        ctx.font = '700 24px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.fillText(githubVal, canvas.width / 2, 790);

        // Footer Bar
        ctx.fillStyle = '#23231d';
        ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 80);
        ctx.lineTo(canvas.width, canvas.height - 80);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 16px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.fillText('STITCH GOA • OCTOBER 2026 • BUILT FOR BUILDERS', canvas.width / 2, canvas.height - 35);

        // Output to image preview element
        previewImage.src = canvas.toDataURL('image/png');
        downloadBtn.disabled = !img;
    }

    // Download Button handler
    downloadBtn.addEventListener('click', () => {
        if (!userImage) return;
        const link = document.createElement('a');
        link.download = `Hacker_House_Goa_Badge_${nameInput.value.replace(/\s+/g, '_') || 'Hacker'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    // Initialize with placeholders
    updatePreview();
});
