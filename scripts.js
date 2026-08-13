// ==========================================================
// HACKER HOUSE GOA 2026
// ID GENERATOR
// ==========================================================


document.addEventListener(
    'DOMContentLoaded',
    () => {


        // ==================================================
        // DOM
        // ==================================================

        const uploadArea =
            document.getElementById(
                'upload-area'
            );


        const fileInput =
            document.getElementById(
                'file-input'
            );


        const nameInput =
            document.getElementById(
                'name-input'
            );


        const githubInput =
            document.getElementById(
                'github-input'
            );


        const roleSelect =
            document.getElementById(
                'role-select'
            );


        const previewImage =
            document.getElementById(
                'preview-image'
            );


        const generateBtn =
            document.getElementById(
                'generate-btn'
            );


        const downloadBtn =
            document.getElementById(
                'download-btn'
            );


        const barcodeSvg =
            document.getElementById(
                'barcode'
            );


        // ==================================================
        // STATE
        // ==================================================

        let userImage = null;

        let badgeId = generateBadgeId();


        // ==================================================
        // CANVAS
        // ==================================================

        const canvas =
            document.createElement(
                'canvas'
            );


        /*
            Your template is approximately
            1019 × 1528.

            We use exactly this resolution so that the
            generated image maintains the same proportions.
        */

        canvas.width = 1019;
        canvas.height = 1528;


        const ctx =
            canvas.getContext('2d');


        // ==================================================
        // TEMPLATE
        // ==================================================

        const templateImage =
            new Image();


        templateImage.src =
            './assets/hhgoa.png';


        let templateLoaded = false;


        // Ribbon overlay — drawn on top of the user photo
        const overlayImage =
            new Image();


        overlayImage.src =
            './assets/hhgoa-overlay.png';


        let overlayLoaded = false;


        overlayImage.onload =
            () => {

                overlayLoaded = true;

            };


        overlayImage.onerror =
            () => {

                console.warn(
                    'Ribbon overlay image not found: assets/hhgoa-overlay.png'
                );

            };


        templateImage.onload =
            () => {

                templateLoaded = true;

                updatePreview();

            };


        templateImage.onerror =
            () => {

                console.error(
                    'Template image not found.'
                );

                alert(
                    'Template not found. Please put your final image at: assets/hhgoa.png'
                );

            };


        // ==================================================
        // RANDOM BADGE ID
        // ==================================================

        function generateBadgeId() {

            const random =
                Math.random()
                    .toString(36)
                    .substring(2, 8)
                    .toUpperCase();


            return `HHG26-${random}`;

        }


        // ==================================================
        // UPDATE PREVIEW
        // ==================================================

        function updatePreview() {

            if (!templateLoaded) {
                return;
            }


            drawBadge();

        }


        // ==================================================
        // DRAW BADGE
        // ==================================================

        function drawBadge() {


            // ------------------------------------------------
            // CLEAR
            // ------------------------------------------------

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            // ------------------------------------------------
            // 1. ORIGINAL TEMPLATE
            // ------------------------------------------------

            ctx.drawImage(
                templateImage,
                0,
                0,
                canvas.width,
                canvas.height
            );


            // ------------------------------------------------
            // 2. USER PHOTO
            // ------------------------------------------------

            if (userImage) {

                drawUserPhoto();

            }


            // ------------------------------------------------
            // 3. RIBBON OVERLAY (drawn in front of photo)
            // ------------------------------------------------

            drawRibbonOverlay();


            // ------------------------------------------------
            // 4. LEFT NAME + ROLE
            // ------------------------------------------------

            drawLeftText();


            // ------------------------------------------------
            // 5. BADGE ID
            // ------------------------------------------------

            drawBadgeId();


            // ------------------------------------------------
            // 6. BARCODE
            // ------------------------------------------------

            generateBarcode(
                () => {

                    updatePreviewImage();

                }
            );


            // ------------------------------------------------
            // If barcode isn't available yet
            // ------------------------------------------------

            updatePreviewImage();

        }


        // ==================================================
        // DRAW PHOTO
        // ==================================================

        function drawUserPhoto() {


            /*
                IMPORTANT:

                The uploaded image is expected to already
                have its background removed.

                Therefore this function DOES NOT:

                - create a photo box
                - create a white background
                - create a border
                - create a placeholder
                - crop the photo into a card

                It simply places the transparent person
                directly onto the template.
            */


            const photoX =
                0;


            const photoY =
                0;


            const photoWidth =
                1019;


            const photoHeight =
                1528;


            const scale =
                Math.max(
                    photoWidth / userImage.width,
                    photoHeight / userImage.height
                );


            const width =
                userImage.width * scale;


            const height =
                userImage.height * scale;


            const x =
                photoX +
                (photoWidth - width) / 2;


            const y =
                photoY +
                (photoHeight - height) / 2;


            ctx.save();


            ctx.drawImage(
                userImage,
                x,
                y,
                width,
                height
            );


            ctx.restore();

        }


        // ==================================================
        // RIBBON OVERLAY
        // ==================================================

        function drawRibbonOverlay() {


            /*
                Draw the separate ribbon overlay PNG on top
                of the user photo so the ribbon always
                appears in front of the person.
            */


            if (!overlayLoaded) {
                return;
            }


            ctx.save();


            // Shift ribbon overlay to the left (negative x moves it left)
            const ribbonOffsetX = -300;

            ctx.drawImage(
                overlayImage,
                ribbonOffsetX,
                0,
                canvas.width + Math.abs(ribbonOffsetX),
                canvas.height
            );


            ctx.restore();

        }


        // ==================================================
        // LEFT NAME + ROLE
        // ==================================================

        function drawLeftText() {


            const name =
                nameInput.value.trim()
                    ? nameInput.value
                        .trim()
                        .toUpperCase()
                    : 'YOUR NAME';


            const role =
                roleSelect.value.trim()
                    ? roleSelect.value
                        .trim()
                        .toUpperCase()
                    : 'AI ENGINEER';


            ctx.save();


            // ------------------------------------------------
            // NAME
            // ------------------------------------------------

            ctx.textAlign =
                'left';


            ctx.fillStyle =
                '#E9005B';


            ctx.font =
                '800 56px "Bricolage Grotesque", sans-serif';


            ctx.fillText(
                name,
                55,
                620
            );


            // ------------------------------------------------
            // ROLE
            // ------------------------------------------------

            ctx.fillStyle =
                '#FFFFFF';


            ctx.font =
                'italic 700 30px "JetBrains Mono", monospace';


            ctx.fillText(
                role,
                55,
                670
            );


            ctx.restore();

        }


        // ==================================================
        // BADGE ID
        // ==================================================

        function drawBadgeId() {


            ctx.save();


            ctx.textAlign =
                'left';


            ctx.fillStyle =
                'rgba(255,255,255,0.9)';


            ctx.font =
                '700 24px "JetBrains Mono", monospace';


            ctx.fillText(
                badgeId,
                55,
                760
            );


            ctx.restore();

        }


        // ==================================================
        // BARCODE
        // ==================================================

        function generateBarcode(
            callback
        ) {


            if (
                typeof JsBarcode ===
                'undefined'
            ) {

                console.warn(
                    'JsBarcode not loaded.'
                );

                return;

            }


            if (!barcodeSvg) {

                return;

            }


            try {

                JsBarcode(
                    barcodeSvg,
                    badgeId,
                    {

                        format:
                            'CODE128',

                        width:
                            2,

                        height:
                            55,

                        displayValue:
                            false,

                        margin:
                            0

                    }
                );


                const svgString =
                    new XMLSerializer()
                        .serializeToString(
                            barcodeSvg
                        );


                const svgBlob =
                    new Blob(
                        [svgString],
                        {
                            type:
                                'image/svg+xml;charset=utf-8'
                        }
                    );


                const url =
                    URL.createObjectURL(
                        svgBlob
                    );


                const barcodeImage =
                    new Image();


                barcodeImage.onload =
                    () => {


                        /*
                            BARCODE POSITION

                            Below name/role/badge-id.
                        */


                        ctx.drawImage(

                            barcodeImage,

                            55,
                            780,

                            220,
                            60

                        );


                        URL.revokeObjectURL(
                            url
                        );


                        if (callback) {

                            callback();

                        }

                    };


                barcodeImage.src =
                    url;


            } catch (error) {

                console.error(
                    'Barcode generation error:',
                    error
                );

            }

        }


        // ==================================================
        // UPDATE HTML PREVIEW
        // ==================================================

        function updatePreviewImage() {


            if (!previewImage) {
                return;
            }


            previewImage.src =
                canvas.toDataURL(
                    'image/png'
                );


            if (downloadBtn) {

                downloadBtn.disabled =
                    !userImage;

            }

        }


        // ==================================================
        // UPLOAD
        // ==================================================

        uploadArea.addEventListener(
            'click',
            () => {

                fileInput.click();

            }
        );


        uploadArea.addEventListener(
            'dragover',
            (event) => {

                event.preventDefault();

                uploadArea.classList.add(
                    'upload-active'
                );

            }
        );


        uploadArea.addEventListener(
            'dragleave',
            () => {

                uploadArea.classList.remove(
                    'upload-active'
                );

            }
        );


        uploadArea.addEventListener(
            'drop',
            (event) => {

                event.preventDefault();


                uploadArea.classList.remove(
                    'upload-active'
                );


                const files =
                    event.dataTransfer.files;


                if (
                    files &&
                    files.length
                ) {

                    handleFile(
                        files[0]
                    );

                }

            }
        );


        fileInput.addEventListener(
            'change',
            (event) => {

                if (
                    event.target.files &&
                    event.target.files.length
                ) {

                    handleFile(
                        event.target.files[0]
                    );

                }

            }
        );


        // ==================================================
        // HANDLE FILE
        // ==================================================

        async function handleFile(file) {
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image.');
                return;
            }

            const loadingOverlay = document.getElementById('loading-overlay');
            const loadingText = document.getElementById('loading-text');
            if (loadingOverlay) loadingOverlay.classList.remove('hidden');
            if (loadingText) loadingText.textContent = 'Loading AI model...';

            try {

                // Client-side background removal — no API key needed
                if (loadingText) loadingText.textContent = 'Removing background (AI)...';

                // Try loading the background removal library
                let removeBackground;
                try {
                    const mod = await import(
                        'https://esm.run/@imgly/background-removal'
                    );
                    removeBackground = mod.removeBackground || mod.default?.removeBackground || mod.default;
                } catch (importErr) {
                    console.warn('ESM import failed, trying UMD fallback:', importErr);
                    // Fallback: load as a script tag
                    await new Promise((resolve, reject) => {
                        if (window.BackgroundRemoval) { resolve(); return; }
                        const s = document.createElement('script');
                        s.src = 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/dist/background-removal.browser.js';
                        s.onload = resolve;
                        s.onerror = reject;
                        document.head.appendChild(s);
                    });
                    removeBackground = window.BackgroundRemoval?.removeBackground;
                }

                if (typeof removeBackground !== 'function') {
                    throw new Error('removeBackground function not found in library');
                }

                const resultBlob = await removeBackground(file, {
                    output: { format: 'image/png', quality: 1 },
                    progress: (key, current, total) => {
                        if (loadingText && total > 0) {
                            const pct = Math.round((current / total) * 100);
                            loadingText.textContent = `Removing background… ${pct}%`;
                        }
                    }
                });

                const url = URL.createObjectURL(resultBlob);
                const image = new Image();
                image.onload = () => {
                    userImage = image;
                    updatePreview();
                    URL.revokeObjectURL(url);
                    if (loadingOverlay) loadingOverlay.classList.add('hidden');
                };
                image.onerror = () => {
                    console.error('Failed to load processed image.');
                    loadFallback(file, loadingOverlay);
                };
                image.src = url;

            } catch (error) {
                console.error('Background removal failed:', error);
                // Silently fall back — no scary alert
                loadFallback(file, loadingOverlay);
            }
        }

        function loadFallback(file, loadingOverlay) {
            const loadingText = document.getElementById('loading-text');
            if (loadingText) loadingText.textContent = 'Using original image...';
            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.onload = () => {
                    userImage = image;
                    updatePreview();
                    if (loadingOverlay) loadingOverlay.classList.add('hidden');
                };
                image.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }


        // ==================================================
        // LIVE INPUT UPDATES
        // ==================================================

        nameInput.addEventListener(
            'input',
            updatePreview
        );


        githubInput.addEventListener(
            'input',
            updatePreview
        );


        roleSelect.addEventListener(
            'input',
            updatePreview
        );


        // ==================================================
        // GENERATE
        // ==================================================

        generateBtn.addEventListener(
            'click',
            () => {


                if (!userImage) {

                    alert(
                        'Please upload your photo first.'
                    );

                    return;

                }


                if (
                    !nameInput.value.trim()
                ) {

                    alert(
                        'Please enter your name.'
                    );

                    nameInput.focus();

                    return;

                }


                /*
                    Generate a NEW ID every time the
                    user presses Generate.
                */

                badgeId =
                    generateBadgeId();


                /*
                    Draw everything again.
                */

                drawBadge();


                /*
                    Give the barcode a moment to render.
                */

                setTimeout(
                    () => {


                        const finalImage =
                            canvas.toDataURL(
                                'image/png'
                            );


                        // ------------------------------------
                        // SAVE FOR SUCCESS PAGE
                        // ------------------------------------

                        sessionStorage.setItem(
                            'generatedBadge',
                            finalImage
                        );


                        sessionStorage.setItem(
                            'generatedBadgeName',
                            nameInput.value.trim()
                        );


                        sessionStorage.setItem(
                            'generatedBadgeRole',
                            roleSelect.value.trim()
                        );


                        sessionStorage.setItem(
                            'generatedBadgeId',
                            badgeId
                        );


                        // ------------------------------------
                        // GO TO SUCCESS
                        // ------------------------------------

                        window.location.href =
                            'success.html';


                    },
                    300
                );

            }
        );


        // ==================================================
        // DIRECT DOWNLOAD
        // ==================================================

        downloadBtn.addEventListener(
            'click',
            () => {


                if (!userImage) {

                    return;

                }


                const name =
                    nameInput.value.trim()
                    || 'Hacker';


                const link =
                    document.createElement(
                        'a'
                    );


                link.download =
                    `Hacker_House_Goa_2026_${name
                        .replace(/\s+/g, '_')
                    }.png`;


                link.href =
                    canvas.toDataURL(
                        'image/png'
                    );


                link.click();

            }
        );


        // ==================================================
        // INITIAL
        // ==================================================

        updatePreview();

    }
);