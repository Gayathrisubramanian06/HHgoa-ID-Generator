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
            // 3. DIAGONAL RIBBON BANDS WITH NAME + ROLE
            // ------------------------------------------------

            drawDiagonalRibbons();


            // ------------------------------------------------
            // 4. BADGE ID
            // ------------------------------------------------

            drawBadgeId();


            // ------------------------------------------------
            // 5. BARCODE
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
        // DIAGONAL RIBBON BANDS WITH NAME + ROLE
        //
        // Draws two parallel diagonal pink sashes across the
        // photo, filled with repeating "NAME • ROLE" text —
        // just like the reference image.
        // ==================================================

        function drawDiagonalRibbons() {

            const name =
                nameInput.value.trim()
                    ? nameInput.value.trim().toUpperCase()
                    : 'YOUR NAME';

            const role =
                roleSelect.value.trim()
                    ? roleSelect.value.trim().toUpperCase()
                    : 'AI ENGINEER';

            // Repeating text pattern — matches the reference image style
            const ribbonText = `${name}  •  ${role}  •  `;

            const RIBBON_COLOR  = '#E9005B';   // hot pink
            const TEXT_COLOR    = '#FFFFFF';   // white
            const RIBBON_HEIGHT = 105;         // px, height of each band
            const ANGLE_DEG     = -12;         // tilt: negative = lower-left to upper-right
            const ANGLE_RAD     = (ANGLE_DEG * Math.PI) / 180;

            // Cover full rotated canvas diagonal
            const DIAG = Math.sqrt(
                canvas.width  * canvas.width +
                canvas.height * canvas.height
            );

            // Two parallel ribbon centers (Y position on canvas)
            const centers = [
                canvas.height * 0.42,  // first band  ~42% from top
                canvas.height * 0.56,  // second band ~56% from top
            ];

            ctx.save();

            centers.forEach((centerY) => {

                ctx.save();

                // Rotate around midpoint of this ribbon's vertical position
                ctx.translate(canvas.width / 2, centerY);
                ctx.rotate(ANGLE_RAD);

                // ── Pink band ────────────────────────────────────────────
                ctx.fillStyle = RIBBON_COLOR;
                ctx.fillRect(
                    -DIAG,
                    -RIBBON_HEIGHT / 2,
                    DIAG * 2,
                    RIBBON_HEIGHT
                );

                // ── Repeating text ───────────────────────────────────────
                ctx.fillStyle    = TEXT_COLOR;
                ctx.font         = 'bold 48px "JetBrains Mono", monospace';
                ctx.textBaseline = 'middle';
                ctx.textAlign    = 'left';

                const tW = ctx.measureText(ribbonText).width;

                for (let x = -DIAG; x < DIAG; x += tW) {
                    ctx.fillText(ribbonText, x, 0);
                }

                ctx.restore();

            });

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
            if (loadingText) loadingText.textContent = 'Removing background...';

            try {
                const resultBlob = await removeBackgroundFast(file, (msg) => {
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