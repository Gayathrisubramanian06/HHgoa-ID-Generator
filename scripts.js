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
            // 3. RESTORE RIBBONS
            // ------------------------------------------------

            drawRibbonOne();

            drawRibbonTwo();


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
                55;


            const photoY =
                235;


            const photoWidth =
                900;


            const photoHeight =
                1120;


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
        // RIBBON 1
        // ==================================================

        function drawRibbonOne() {


            /*
                We take ONLY the ribbon portion from the
                original template and put it back on top
                of the person.

                This is what creates:

                    PHOTO
                      ↓
                    RIBBON
            */


            ctx.save();


            ctx.beginPath();


            ctx.moveTo(
                0,
                930
            );


            ctx.lineTo(
                1019,
                1065
            );


            ctx.lineTo(
                1019,
                1170
            );


            ctx.lineTo(
                0,
                1035
            );


            ctx.closePath();


            ctx.clip();


            ctx.drawImage(
                templateImage,
                0,
                0,
                canvas.width,
                canvas.height
            );


            ctx.restore();

        }


        // ==================================================
        // RIBBON 2
        // ==================================================

        function drawRibbonTwo() {


            ctx.save();


            ctx.beginPath();


            ctx.moveTo(
                0,
                1050
            );


            ctx.lineTo(
                1019,
                1180
            );


            ctx.lineTo(
                1019,
                1290
            );


            ctx.lineTo(
                0,
                1150
            );


            ctx.closePath();


            ctx.clip();


            ctx.drawImage(
                templateImage,
                0,
                0,
                canvas.width,
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
                '800 42px "Bricolage Grotesque", sans-serif';


            ctx.fillText(
                name,
                55,
                520
            );


            // ------------------------------------------------
            // ROLE
            // ------------------------------------------------

            ctx.fillStyle =
                '#FFFFFF';


            ctx.font =
                'italic 700 22px "JetBrains Mono", monospace';


            ctx.fillText(
                role,
                55,
                558
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
                '700 22px "JetBrains Mono", monospace';


            ctx.fillText(
                badgeId,
                35,
                92
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

                            Top-left of the template.
                        */


                        ctx.drawImage(

                            barcodeImage,

                            35,
                            115,

                            190,
                            55

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

        function handleFile(file) {


            if (
                !file.type.startsWith(
                    'image/'
                )
            ) {

                alert(
                    'Please upload an image.'
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                (event) => {


                    const image =
                        new Image();


                    image.onload =
                        () => {


                            /*
                                IMPORTANT:

                                If your existing background
                                removal API returns a transparent
                                PNG, replace userImage with that
                                returned image.

                                For now this accepts the uploaded
                                image directly.
                            */


                            userImage =
                                image;


                            updatePreview();

                        };


                    image.src =
                        event.target.result;

                };


            reader.readAsDataURL(
                file
            );

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
            'change',
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