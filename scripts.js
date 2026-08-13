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


        const generateBtnMobile =
            document.getElementById(
                'generate-btn-mobile'
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


        // Ribbon overlay PNG — the "<" chevron drawn on top of the user photo
        const overlayImage = new Image();
        overlayImage.src = './assets/hhgoa-overlay.png';
        let overlayLoaded = false;

        overlayImage.onload  = () => { overlayLoaded = true; };
        overlayImage.onerror = () => { console.warn('hhgoa-overlay.png not found'); };


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
            // 3. OVERLAY RIBBON PNG (chevron shape)
            // ------------------------------------------------

            drawRibbonOverlay();


            // ------------------------------------------------
            // 4. NAME + ROLE TEXT ON THE RIBBON BANDS
            // ------------------------------------------------

            drawRibbonText();


            // ------------------------------------------------
            // 5. LEFT NAME + ROLE
            // ------------------------------------------------

            drawLeftText();


            // ------------------------------------------------
            // 6. BADGE ID
            // ------------------------------------------------

            drawBadgeId();


            // ------------------------------------------------
            // 7. BARCODE
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


            // Center the photo perfectly using cover logic
            const x = photoX + (photoWidth - width) / 2;
            const y = photoY + (photoHeight - height) / 2;


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
        // Draws the hhgoa-overlay.png chevron ("<" shape)
        // on top of the user photo, positioned to the left.
        // ==================================================

        function drawRibbonOverlay() {

            if (!overlayLoaded) return;

            ctx.save();

            // Draw overlay aligned to left edge, full canvas height
            ctx.drawImage(
                overlayImage,
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.restore();

        }


        // ==================================================
        // RIBBON TEXT
        // Draws the user's name and role repeating along the two
        // diagonal bands of the chevron overlay.
        // ==================================================

        function drawRibbonText() {

            const name =
                nameInput.value.trim()
                    ? nameInput.value.trim().toUpperCase()
                    : 'YOUR NAME';

            const role =
                roleSelect.value.trim()
                    ? roleSelect.value.trim().toUpperCase()
                    : 'YOUR ROLE';

            const FONT         = 'bold 44px "JetBrains Mono", monospace';
            const TEXT_COLOR   = '#FFFFFF';

            // Custom tilt angles and offsets matching hhgoa-overlay.png bands exactly
            const UPPER_ANGLE  =  16.9 * Math.PI / 180;
            const LOWER_ANGLE  = -17.4 * Math.PI / 180;

            const ANCHOR_X = -5;
            const ANCHOR_Y = 1110;

            // Offset perpendicular to the ribbon line to center it exactly inside the pink path
            const UPPER_Y_OFFSET = 145;
            const LOWER_Y_OFFSET = 145; // Fixed typo from original code (-110 -> 110)

            const upperText = `${name}  •  ${role}  •  `;
            const lowerText = `${role}  •  ${name}  •  `;

            ctx.save();
            ctx.fillStyle    = TEXT_COLOR;
            ctx.font         = FONT;
            ctx.textBaseline = 'middle';
            ctx.textAlign    = 'left';

            const upperW = ctx.measureText(upperText).width;
            const lowerW = ctx.measureText(lowerText).width;

            // ── Upper ribbon band: NAME • ROLE ───────────────────────────
            ctx.save();
            ctx.translate(ANCHOR_X, ANCHOR_Y);
            ctx.rotate(-UPPER_ANGLE);
            for (let offset = 120; offset < 1500; offset += upperW) {
                ctx.fillText(upperText, offset, UPPER_Y_OFFSET);
            }
            ctx.restore();

            // ── Lower ribbon band: ROLE • NAME ───────────────────────────
            ctx.save();
            ctx.translate(ANCHOR_X, ANCHOR_Y);
            ctx.rotate(-LOWER_ANGLE);
            for (let offset = 120; offset < 1500; offset += lowerW) {
                ctx.fillText(lowerText, offset, LOWER_Y_OFFSET);
            }
            ctx.restore();

            ctx.restore();

        }


        // ==================================================
        // LEFT NAME + ROLE
        // ==================================================

        function drawLeftText() {

            const name =
                nameInput.value.trim()
                    ? nameInput.value.trim().toUpperCase()
                    : 'YOUR NAME';

            const role =
                roleSelect.value.trim()
                    ? roleSelect.value.trim().toUpperCase()
                    : 'YOUR ROLE';

            ctx.save();

            // Name on left
            ctx.textAlign = 'left';
            ctx.fillStyle = '#E9005B';
            ctx.font      = '800 56px "Bricolage Grotesque", sans-serif';
            ctx.fillText(name, 55, 620);

            // Role on left
            ctx.fillStyle = '#FFFFFF';
            ctx.font      = 'italic 700 30px "JetBrains Mono", monospace';
            ctx.fillText(role, 55, 670);

            ctx.restore();

        }


        // ==================================================
        // BARCODE
        // ==================================================

        function generateBarcode(callback) {

            if (typeof JsBarcode === 'undefined') {
                console.warn('JsBarcode not loaded.');
                return;
            }

            if (!barcodeSvg) return;

            try {
                JsBarcode(barcodeSvg, badgeId, {
                    format: 'CODE128',
                    width: 2,
                    height: 55,
                    displayValue: false,
                    margin: 0
                });

                const svgString = new XMLSerializer().serializeToString(barcodeSvg);
                const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(svgBlob);
                const barcodeImage = new Image();

                barcodeImage.onload = () => {
                    ctx.drawImage(barcodeImage, 55, 780, 220, 60);
                    URL.revokeObjectURL(url);
                    if (callback) callback();
                };

                barcodeImage.src = url;

            } catch (error) {
                console.error('Barcode generation error:', error);
            }

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
            if (!file.type.startsWith('image/') && !file.name.toLowerCase().match(/\.(heic|heif)$/)) {
                alert('Please upload an image.');
                return;
            }

            const loadingOverlay = document.getElementById('loading-overlay');
            const loadingText = document.getElementById('loading-text');
            if (loadingOverlay) loadingOverlay.classList.remove('hidden');
            if (loadingText) loadingText.textContent = 'Processing image...';

            try {
                let processFile = file;
                // Convert HEIC to JPEG if needed
                if (file.name.toLowerCase().match(/\.(heic|heif)$/) || file.type === 'image/heic' || file.type === 'image/heif') {
                    if (loadingText) loadingText.textContent = 'Converting HEIC...';
                    const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.8 });
                    processFile = new File([convertedBlob], file.name.replace(/\.[^/.]+$/, ".jpg"), { type: 'image/jpeg' });
                }

                if (loadingText) loadingText.textContent = 'Removing background...';
                const resultBlob = await removeBackgroundFast(processFile, (msg) => {
                    if (loadingText) loadingText.textContent = msg;
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
                loadFallback(file, loadingOverlay);
            }
        }


        // ==================================================
        // FAST BACKGROUND REMOVAL — MediaPipe Selfie Segmentation
        // Real-time capable (~5MB model vs 40-100MB for imgly)
        // Typically processes a photo in under 1 second.
        // ==================================================

        async function removeBackgroundFast(file, onStatus) {

            return new Promise(async (resolve, reject) => {

                const imgUrl = URL.createObjectURL(file);
                const img = new Image();

                img.onload = async () => {

                    try {

                        // Load MediaPipe script once
                        if (!window.SelfieSegmentation) {
                            if (onStatus) onStatus('Loading AI model (~5 MB)...');
                            await new Promise((res, rej) => {
                                const s = document.createElement('script');
                                s.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/selfie_segmentation.js';
                                s.crossOrigin = 'anonymous';
                                s.onload = res;
                                s.onerror = rej;
                                document.head.appendChild(s);
                            });
                        }

                        if (onStatus) onStatus('Removing background...');

                        const seg = new SelfieSegmentation({
                            locateFile: (f) =>
                                `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${f}`
                        });

                        // modelSelection: 0 = general (fast), 1 = landscape (slightly more accurate)
                        seg.setOptions({ modelSelection: 0 });

                        seg.onResults((results) => {

                            const outCanvas = document.createElement('canvas');
                            outCanvas.width  = img.naturalWidth;
                            outCanvas.height = img.naturalHeight;
                            const outCtx = outCanvas.getContext('2d');

                            // Draw original photo
                            outCtx.drawImage(img, 0, 0);

                            // Apply segmentation mask: keep only foreground (person)
                            outCtx.globalCompositeOperation = 'destination-in';
                            outCtx.drawImage(
                                results.segmentationMask,
                                0, 0,
                                img.naturalWidth,
                                img.naturalHeight
                            );

                            outCanvas.toBlob((blob) => {
                                URL.revokeObjectURL(imgUrl);
                                seg.close();
                                if (blob) {
                                    resolve(blob);
                                } else {
                                    reject(new Error('Canvas toBlob returned null'));
                                }
                            }, 'image/png');

                        });

                        await seg.send({ image: img });

                    } catch (err) {
                        URL.revokeObjectURL(imgUrl);
                        reject(err);
                    }

                };

                img.onerror = () => {
                    URL.revokeObjectURL(imgUrl);
                    reject(new Error('Image failed to load'));
                };

                img.src = imgUrl;

            });

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


        roleSelect.addEventListener(
            'input',
            updatePreview
        );


        // ==================================================
        // GENERATE ACTION
        // ==================================================

        function triggerGenerate() {
            const name = nameInput.value.trim();
            const role = roleSelect.value.trim();

            const missing = [];
            if (!userImage) missing.push('Photo');
            if (!name) missing.push('Name');
            if (!role) missing.push('Role');

            if (missing.length > 0) {
                alert(`Please fill out all fields before generating: Missing ${missing.join(', ')}.`);
                return;
            }

            badgeId = generateBadgeId();
            drawBadge();

            setTimeout(
                () => {
                    const finalImage = canvas.toDataURL('image/png');
                    sessionStorage.setItem('generatedBadge', finalImage);
                    sessionStorage.setItem('generatedBadgeName', name);
                    sessionStorage.setItem('generatedBadgeRole', role);
                    sessionStorage.setItem('generatedBadgeId', badgeId);
                    window.location.href = 'success.html';
                },
                300
            );
        }

        if (generateBtn) {
            generateBtn.addEventListener('click', triggerGenerate);
        }

        if (generateBtnMobile) {
            generateBtnMobile.addEventListener('click', triggerGenerate);
        }

        // ==================================================
        // INITIAL
        // ==================================================

        updatePreview();

    }
);